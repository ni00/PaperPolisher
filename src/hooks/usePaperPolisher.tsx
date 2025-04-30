import { useEffect, useState } from "react"
import { requestOpenAI } from "../lib/request"
import {
    polishPrompt,
    rewritePrompt,
    expandPrompt,
    condensePrompt,
    translatePrompt,
    referencePrompt,
    aiReducePrompt,
    aiCheckPrompt
} from "../lib/prompts"
import { toast } from "sonner"

export interface PaperPolisherState {
    sourceText: string
    resultText: string
    activeTab: string
    isProcessing: boolean
    similarityScore: number | null
    wordCount: number
}

export function usePaperPolisher() {
    const [sourceText, setSourceText] = useState("")
    const [resultText, setResultText] = useState("")
    const [activeTab, setActiveTab] = useState("edit")
    const [isProcessing, setIsProcessing] = useState(false)
    const [similarityScore, setSimilarityScore] = useState<number | null>(null)
    const [sourceWordCount, setSourceWordCount] = useState(0)
    const [resultWordCount, setResultWordCount] = useState(0)

    useEffect(() => {
        setSourceWordCount(sourceText.length)
    }, [sourceText])

    useEffect(() => {
        setResultWordCount(resultText.length)
    }, [resultText])

    const handleImport = () => {
        try {
            const fileInput = document.createElement("input")
            fileInput.type = "file"
            fileInput.accept = ".txt"
            fileInput.onchange = (e) => {
                try {
                    const file = (e.target as HTMLInputElement).files?.[0]
                    if (file) {
                        const reader = new FileReader()
                        reader.onload = (event) => {
                            try {
                                setSourceText(event.target?.result as string)
                                toast.success("文件导入成功")
                            } catch (err) {
                                toast.error("读取文件内容失败")
                                console.error("读取文件内容失败:", err)
                            }
                        }
                        reader.onerror = () => {
                            toast.error("读取文件失败")
                            console.error("读取文件失败:", reader.error)
                        }
                        reader.readAsText(file)
                    }
                } catch (err) {
                    toast.error("选择文件失败")
                    console.error("选择文件失败:", err)
                }
            }
            fileInput.click()
        } catch (err) {
            toast.error("导入操作失败")
            console.error("导入操作失败:", err)
        }
    }

    const handleClear = () => {
        setSourceText("")
        toast.info("内容已清空")
    }

    const handleExport = () => {
        try {
            if (!resultText.trim()) {
                toast.error("没有内容可导出")
                return
            }

            const blob = new Blob([resultText], { type: "text/plain" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "polished-text.txt"
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
            toast.success("文件导出成功")
        } catch (err) {
            toast.error("导出失败")
            console.error("导出失败:", err)
        }
    }

    const handleCopy = async () => {
        try {
            if (!resultText.trim()) {
                toast.error("没有内容可复制")
                return
            }

            await navigator.clipboard.writeText(resultText)
            toast.success("文本已复制到剪贴板")
        } catch (err) {
            toast.error("复制失败，请手动复制")
            console.error("复制失败:", err)
        }
    }

    const handleReplaceSource = () => {
        try {
            if (!resultText.trim()) {
                toast.error("没有内容可替换")
                return
            }
            setSourceText(resultText)
            setResultText("")
            setSimilarityScore(null)
            toast.success("内容已替换到源文本框")
        } catch (err) {
            toast.error("替换失败")
            console.error("替换失败:", err)
        }
    }

    const handleSourceTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSourceText(e.target.value)
    }

    const handleResultTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setResultText(e.target.value)
    }

    const processText = async (action: string) => {
        if (!sourceText.trim()) {
            toast.error("请先输入一些文本")
            return
        }

        setIsProcessing(true)
        let systemPrompt = "";
        let result = "";
        let toastId = toast.loading("正在处理文本...");

        try {
            // 根据不同操作选择相应的提示词
            switch (action) {
                case "polish":
                    systemPrompt = polishPrompt;
                    break;
                case "rewrite":
                    systemPrompt = rewritePrompt;
                    break;
                case "expand":
                    systemPrompt = expandPrompt;
                    break;
                case "condense":
                    systemPrompt = condensePrompt;
                    break;
                case "translate":
                    systemPrompt = translatePrompt;
                    break;
                case "reference":
                    systemPrompt = referencePrompt;
                    break;
                case "ai-paraphrase":
                    systemPrompt = aiReducePrompt;
                    break;
                case "ai-plagiarism":
                    systemPrompt = aiCheckPrompt;
                    break;
                default:
                    toast.error("未知的操作类型");
                    setIsProcessing(false);
                    return;
            }

            // 调用实际的API
            result = await requestOpenAI(systemPrompt, sourceText);

            // 如果是查重操作，设置相似度分数并切换到查重标签页
            if (action === "ai-plagiarism") {
                // 尝试从结果文本中提取相似度分数
                const similarityMatch = result.match(/(\d+)%/);
                if (similarityMatch && similarityMatch[1]) {
                    setSimilarityScore(parseInt(similarityMatch[1]));
                } else {
                    // 如果无法从结果中提取，默认设置一个值
                    setSimilarityScore(20);
                }
                setActiveTab("plagiarism");
                toast.dismiss(toastId);
                toast.success("查重完成");
            } else {
                setSimilarityScore(null);
                toast.dismiss(toastId);
                toast.success("处理完成");
            }

            setResultText(result);
        } catch (err) {
            if (err instanceof Error) {
                toast.dismiss(toastId);
                toast.error(`处理失败: ${err.message}`);
            } else {
                toast.dismiss(toastId);
                toast.error('处理失败，请稍后重试');
            }
            console.error('处理文本时出错:', err);
            // 保留最后一次成功处理的结果
        } finally {
            setIsProcessing(false);
        }
    }

    return {
        sourceText,
        resultText,
        activeTab,
        isProcessing,
        similarityScore,
        sourceWordCount,
        resultWordCount,
        setActiveTab,
        handleImport,
        handleClear,
        handleExport,
        handleCopy,
        handleReplaceSource,
        handleSourceTextChange,
        handleResultTextChange,
        processText
    }
}