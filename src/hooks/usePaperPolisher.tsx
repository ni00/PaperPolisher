import { useState } from "react"

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
    const [wordCount, setWordCount] = useState(0)

    const updateWordCount = (text: string) => {
        // Simple word count calculation
        const words = text
            .trim()
            .split(/\s+/)
            .filter((word) => word.length > 0)
        setWordCount(words.length)
    }

    const handleImport = () => {
        // In a real app, this would open a file picker
        alert("导入功能将在此实现")
    }

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText()
            setSourceText(text)
            updateWordCount(text)
        } catch (err) {
            alert("无法读取剪贴板。请手动粘贴。")
        }
    }

    const handleClear = () => {
        setSourceText("")
        setWordCount(0)
    }

    const handleExport = () => {
        const blob = new Blob([resultText], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "polished-text.txt"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(resultText)
            // Use a more subtle notification instead of alert
            const notification = document.getElementById("copy-notification")
            if (notification) {
                notification.classList.remove("opacity-0")
                notification.classList.add("opacity-100")
                setTimeout(() => {
                    notification.classList.remove("opacity-100")
                    notification.classList.add("opacity-0")
                }, 2000)
            }
        } catch (err) {
            alert("复制失败。请手动复制。")
        }
    }

    const handleClearResult = () => {
        setResultText("")
        setSimilarityScore(null)
    }

    const handleSourceTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSourceText(e.target.value)
        updateWordCount(e.target.value)
    }

    const handleResultTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setResultText(e.target.value)
        updateWordCount(e.target.value)
    }

    const processText = (action: string) => {
        if (!sourceText.trim()) {
            alert("请先输入一些文本")
            return
        }

        setIsProcessing(true)

        // Simulate API call with timeout
        setTimeout(() => {
            // In a real app, these would call APIs or use more sophisticated processing
            switch (action) {
                case "polish":
                    setResultText(`[已润色] ${sourceText}`)
                    break
                case "rewrite":
                    setResultText(`[已改写] ${sourceText}`)
                    break
                case "expand":
                    setResultText(`[已扩写] ${sourceText}\n\n此处将显示更多细节和阐述。`)
                    break
                case "condense":
                    setResultText(`[已缩写] ${sourceText.substring(0, sourceText.length / 2)}...`)
                    break
                case "translate":
                    setResultText(`[已翻译] ${sourceText}`)
                    break
                case "ai-paraphrase":
                    setResultText(
                        `[AI降重结果] 这是您文本的完全改写版本，保持了原意的同时使用了不同的词语和句式结构，以减少与原文的相似度。`,
                    )
                    break
                case "ai-plagiarism":
                    setResultText(
                        `[AI查重结果]\n\n原创内容：78%\n发现潜在匹配：3处\n\n建议操作：\n- 检查高亮部分\n- 添加适当引用\n- 重新表述问题段落`,
                    )
                    setSimilarityScore(22) // Example similarity score
                    setActiveTab("plagiarism")
                    break
                default:
                    setResultText(sourceText)
            }
            setIsProcessing(false)
        }, 1500)
    }

    return {
        sourceText,
        resultText,
        activeTab,
        isProcessing,
        similarityScore,
        wordCount,
        setActiveTab,
        handleImport,
        handlePaste,
        handleClear,
        handleExport,
        handleCopy,
        handleClearResult,
        handleSourceTextChange,
        handleResultTextChange,
        processText
    }
}