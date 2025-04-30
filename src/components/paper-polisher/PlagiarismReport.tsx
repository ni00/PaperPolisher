import React from "react"
import { AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

interface PlagiarismReportProps {
    similarityScore: number | null
    resultText: string
}

export function PlagiarismReport({ similarityScore, resultText }: PlagiarismReportProps) {
    if (similarityScore === null) {
        return (
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                <h3 className="font-medium">尚未进行查重</h3>
                <p className="text-sm text-muted-foreground mt-2">
                    点击"AI查重"按钮以分析您的文本是否存在潜在重复
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
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

            <div className="border rounded-md p-[10px] space-y-2">
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
        </div>
    )
}