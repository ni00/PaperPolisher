import type React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { SourceTextArea } from "@/components/paper-polisher/SourceTextArea"
import { ResultTextArea } from "@/components/paper-polisher/ResultTextArea"
import { PlagiarismReport } from "@/components/paper-polisher/PlagiarismReport"
import { ActionButtons } from "@/components/paper-polisher/ActionButtons"
import { SettingsDialog } from "@/components/paper-polisher/SettingsDialog"
import { usePaperPolisher } from "@/hooks/usePaperPolisher"
import DiffMatchPatch from 'diff-match-patch'
import { useEffect, useState } from "react"

const dmp = new DiffMatchPatch()

export default function MainPage() {
    const {
        sourceText,
        resultText,
        activeTab,
        isProcessing,
        similarityScore,
        sourceWordCount,
        resultWordCount,
        isSettingsOpen,
        setActiveTab,
        handleSettingOpen,
        handleSettingClose,
        handleImport,
        handleClear,
        handleExport,
        handleCopy,
        handleReplaceSource,
        handleSourceTextChange,
        handleResultTextChange,
        processText
    } = usePaperPolisher()

    const [diffHtml, setDiffHtml] = useState<string>("")

    useEffect(() => {
        const diff = dmp.diff_main(sourceText, resultText)
        dmp.diff_cleanupSemantic(diff)
        const html = dmp.diff_prettyHtml(diff)
        setDiffHtml(html)
    }, [sourceText, resultText])

    return (
        <div className="w-full min-h-screen bg-background overflow-y-auto">
            <div className="container mx-auto py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    {/* Source Text Section */}
                    <SourceTextArea
                        sourceText={sourceText}
                        wordCount={sourceWordCount}
                        handleImport={handleImport}
                        handleClear={handleClear}
                        handleTextChange={handleSourceTextChange}
                        handleSetting={handleSettingOpen}
                    />

                    {/* Result Text Section */}
                    <div className="space-y-4">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="edit">编辑后的文本</TabsTrigger>
                                <TabsTrigger value="plagiarism">查重报告</TabsTrigger>
                            </TabsList>
                            <TabsContent value="edit" className="mt-2">
                                <ResultTextArea
                                    resultText={resultText}
                                    wordCount={resultWordCount}
                                    isProcessing={isProcessing}
                                    handleExport={handleExport}
                                    handleCopy={handleCopy}
                                    handleReplaceSource={handleReplaceSource}
                                    handleTextChange={handleResultTextChange}
                                />
                            </TabsContent>

                            <TabsContent value="plagiarism" className="mt-2 space-y-4">
                                <PlagiarismReport
                                    similarityScore={similarityScore}
                                    resultText={resultText}
                                />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="px-4 mt-4">
                    <ActionButtons
                        isProcessing={isProcessing}
                        processText={processText}
                    />
                </div>

                {/* Diff Section */}
                <div className="px-4 mt-4 border-t">
                    <h2 className="text-md font-semibold">差异对比:</h2>
                    <div className="mt-2 max-h-[300px] overflow-y-auto" dangerouslySetInnerHTML={{ __html: diffHtml }} />
                </div>

                {/* 设置弹窗 */}
                <SettingsDialog
                    open={isSettingsOpen}
                    onOpenChange={handleSettingClose}
                />
            </div>
        </div>
    )
}
