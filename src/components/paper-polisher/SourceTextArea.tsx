import React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Import, Clipboard, Trash2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SourceTextAreaProps {
    sourceText: string
    wordCount: number
    handleImport: () => void
    handlePaste: () => Promise<void>
    handleClear: () => void
    handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export function SourceTextArea({
    sourceText,
    wordCount,
    handleImport,
    handlePaste,
    handleClear,
    handleTextChange
}: SourceTextAreaProps) {
    return (
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
    )
}