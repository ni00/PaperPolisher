import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Import,
    Clipboard,
    Trash2,
    Download,
    Copy,
    Settings,
    AlertCircle,
    Sparkles,
    Percent,
    ArrowLeft
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function MainPage() {
    const [sourceText, setSourceText] = useState("")
    const [resultText, setResultText] = useState("")
    const [activeTab, setActiveTab] = useState("edit")
    const [isProcessing, setIsProcessing] = useState(false)
    const [similarityScore, setSimilarityScore] = useState<number | null>(null)
    const [wordCount, setWordCount] = useState(0)

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
        // In a real app, this would trigger a download
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

    const updateWordCount = (text: string) => {
        // Simple word count calculation
        const words = text
            .trim()
            .split(/\s+/)
            .filter((word) => word.length > 0)
        setWordCount(words.length)
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

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSourceText(e.target.value)
        updateWordCount(e.target.value)
    }

    return (
        <div className="w-full transition-all duration-300 fixed inset-0 z-50 bg-background">

            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    {/* Source Text Section */}
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="sm" onClick={handleImport} className="hover:bg-slate-100">
                                            <Import className="h-4 w-4 mr-2" />
                                            导入
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>从文件导入文本</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="sm" onClick={handlePaste} className="hover:bg-slate-100">
                                            <Clipboard className="h-4 w-4 mr-2" />
                                            粘贴
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>从剪贴板粘贴</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="sm" onClick={handleClear} className="hover:bg-slate-100">
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            清空
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>清空文本</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <div className="ml-auto flex items-center text-sm text-muted-foreground">
                                <span>{wordCount} 字</span>
                            </div>
                        </div>

                        <div className="relative">
                            <Textarea
                                placeholder="在此输入您的文本..."
                                className="min-h-[344px] resize-none"
                                value={sourceText}
                                onChange={handleTextChange}
                            />
                            {!sourceText && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
                                    <div className="text-center p-4">
                                        <p>在此粘贴或输入您的文本</p>
                                        <p className="text-sm text-muted-foreground mt-2">
                                            我们将帮助您润色、改写或检查文本的重复率
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Result Text Section */}
                    <div className="space-y-4">
                        <div
                            id="copy-notification"
                            className="fixed top-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded shadow-md transition-opacity duration-300 opacity-0"
                        >
                            已复制到剪贴板！
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleClearResult}
                                            className="hover:bg-slate-100"
                                        >
                                            <ArrowLeft className="h-4 w-4 mr-2" />
                                            置换
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>置换源文本</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="sm" onClick={handleExport} className="hover:bg-slate-100">
                                            <Download className="h-4 w-4 mr-2" />
                                            导出
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>导出为文本文件</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="sm" onClick={handleCopy} className="hover:bg-slate-100">
                                            <Copy className="h-4 w-4 mr-2" />
                                            复制
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>复制到剪贴板</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <div className="ml-auto flex items-center text-sm text-muted-foreground">
                                <span>{wordCount} 字</span>
                            </div>
                        </div>
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="edit">编辑后的文本</TabsTrigger>
                                <TabsTrigger value="plagiarism">查重报告</TabsTrigger>
                            </TabsList>
                            <TabsContent value="edit" className="mt-2">


                                <div className="relative">
                                    <Textarea
                                        placeholder="处理后的文本将显示在此..."
                                        className="min-h-[300px] resize-none"
                                        value={resultText}
                                        readOnly
                                    />
                                    {isProcessing && (
                                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                                <p className="mt-2">处理中...</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="plagiarism" className="mt-2 space-y-4">
                                {similarityScore !== null ? (
                                    <>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-medium">相似度</h3>
                                                <Badge variant={similarityScore > 30 ? "destructive" : "outline"}>{similarityScore}%</Badge>
                                            </div>
                                            <Progress value={similarityScore} className="h-2" />
                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                <span>0% - 原创</span>
                                                <span>100% - 完全相同</span>
                                            </div>
                                        </div>

                                        <div className="border rounded-md p-4 space-y-2">
                                            <h3 className="font-medium flex items-center gap-2">
                                                <AlertCircle className="h-4 w-4 text-amber-500" />
                                                查重分析
                                            </h3>
                                            <p className="text-sm">
                                                {similarityScore > 30
                                                    ? "您的文档包含大量与现有来源匹配的内容。请考虑修改高亮部分。"
                                                    : "您的文档看起来大部分是原创的。发现的少量匹配可能是常见短语或正确引用的内容。"}
                                            </p>
                                        </div>

                                        <Textarea className="min-h-[150px] resize-none" value={resultText} readOnly />
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-[300px] text-center">
                                        <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                                        <h3 className="font-medium">尚未进行查重</h3>
                                        <p className="text-sm text-muted-foreground mt-2">
                                            点击“AI查重”按钮以分析您的文本是否存在潜在重复
                                        </p>
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 p-4 border-t">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full hover:bg-slate-100"
                                    onClick={() => processText("polish")}
                                    disabled={isProcessing}
                                >
                                    润色
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>润色并优化您的文本</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full hover:bg-slate-100"
                                    onClick={() => processText("rewrite")}
                                    disabled={isProcessing}
                                >
                                    改写
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>改写您的文本</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full hover:bg-slate-100"
                                    onClick={() => processText("expand")}
                                    disabled={isProcessing}
                                >
                                    扩写
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>为您的文本添加更多细节</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full hover:bg-slate-100"
                                    onClick={() => processText("condense")}
                                    disabled={isProcessing}
                                >
                                    缩写
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>将您的文本缩写得更简洁</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full hover:bg-slate-100"
                                    onClick={() => processText("translate")}
                                    disabled={isProcessing}
                                >
                                    译写
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>翻译您的文本</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    {/* New AI Paraphrasing Button */}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full hover:bg-slate-100 text-emerald-600 border-emerald-200"
                                    onClick={() => processText("ai-paraphrase")}
                                    disabled={isProcessing}
                                >
                                    <Percent className="h-4 w-4 mr-1 inline-block" />
                                    AI降重
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>使用AI改写并减少相似度</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    {/* New AI Plagiarism Detection Button */}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full hover:bg-slate-100 text-blue-600 border-blue-200"
                                    onClick={() => processText("ai-plagiarism")}
                                    disabled={isProcessing}
                                >
                                    <Sparkles className="h-4 w-4 mr-1 inline-block" />
                                    AI查重
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>使用AI检查重复率</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" className="w-full hover:bg-slate-100" disabled={isProcessing}>
                                    <Settings className="h-4 w-4 mr-1 inline-block" />
                                    设置
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>配置设置</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    )
}
