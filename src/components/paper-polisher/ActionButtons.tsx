import { Button } from "@/components/ui/button"
import { Percent, Sparkles } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ActionButtonsProps {
    isProcessing: boolean
    processText: (action: string) => void
}

export function ActionButtons({ isProcessing, processText }: ActionButtonsProps) {
    return (
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

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full hover:bg-slate-100"
                            onClick={() => processText("reference")}
                            disabled={isProcessing}
                        >
                            校正
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>校正参考文献的格式</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

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
        </div>
    )
}