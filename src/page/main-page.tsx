import type React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { SourceTextArea } from "@/components/paper-polisher/SourceTextArea"
import { ResultTextArea } from "@/components/paper-polisher/ResultTextArea"
import { PlagiarismReport } from "@/components/paper-polisher/PlagiarismReport"
import { ActionButtons } from "@/components/paper-polisher/ActionButtons"
import { usePaperPolisher } from "@/hooks/usePaperPolisher"

export default function MainPage() {
    const {
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
    } = usePaperPolisher()

    return (
        <div className="w-full min-h-screen bg-background overflow-y-auto">
            <div className="container mx-auto py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    {/* Source Text Section */}
                    <SourceTextArea
                        sourceText={sourceText}
                        wordCount={wordCount}
                        handleImport={handleImport}
                        handlePaste={handlePaste}
                        handleClear={handleClear}
                        handleTextChange={handleSourceTextChange}
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
                                    wordCount={wordCount}
                                    isProcessing={isProcessing}
                                    handleExport={handleExport}
                                    handleCopy={handleCopy}
                                    handleClearResult={handleClearResult}
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
                    <h2 className="text-lg font-semibold">Diff Section</h2>
                    <p>这里可以添加 Diff 组件或相关功能。</p>
                </div>

            </div>
        </div>
    )
}
