import React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Download, Copy, ArrowLeft } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ResultTextAreaProps {
    resultText: string
    wordCount: number
    isProcessing: boolean
    handleExport: () => void
    handleCopy: () => void
    handleClearResult: () => void
}

export function ResultTextArea({
    resultText,
    wordCount,
    isProcessing,
    handleExport,
    handleCopy,
    handleClearResult,
}: ResultTextAreaProps) {
    return (
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
        </div>
    )
}