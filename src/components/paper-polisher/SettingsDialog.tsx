import { useState, useEffect } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
    polishPrompt,
    rewritePrompt,
    expandPrompt,
    condensePrompt,
    translatePrompt,
    referencePrompt,
    aiReducePrompt,
    aiCheckPrompt
} from "@/lib/prompts";

interface SettingsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
    // 模型参数相关状态
    const [baseURL, setBaseURL] = useState(localStorage.getItem("baseURL") || "https://api.siliconflow.cn/v1");
    const [apiKey, setAPIKey] = useState(localStorage.getItem("apiKey") || "sk-xxx");
    const [model, setModel] = useState(localStorage.getItem("model") || "deepseek-ai/DeepSeek-V3");
    const [temperature, setTemperature] = useState(localStorage.getItem("temperature") || "0.7");

    // 提示词模板相关状态
    const [polishTemplate, setPolishTemplate] = useState("");
    const [rewriteTemplate, setRewriteTemplate] = useState("");
    const [expandTemplate, setExpandTemplate] = useState("");
    const [condenseTemplate, setCondenseTemplate] = useState("");
    const [translateTemplate, setTranslateTemplate] = useState("");
    const [referenceTemplate, setReferenceTemplate] = useState("");
    const [aiReduceTemplate, setAiReduceTemplate] = useState("");
    const [aiCheckTemplate, setAiCheckTemplate] = useState("");

    // 当前选择的标签页
    const [activeTab, setActiveTab] = useState("model");

    // 从 localStorage 加载提示词模板
    useEffect(() => {
        setPolishTemplate(localStorage.getItem("polishPrompt") || "");
        setRewriteTemplate(localStorage.getItem("rewritePrompt") || "");
        setExpandTemplate(localStorage.getItem("expandPrompt") || "");
        setCondenseTemplate(localStorage.getItem("condensePrompt") || "");
        setTranslateTemplate(localStorage.getItem("translatePrompt") || "");
        setReferenceTemplate(localStorage.getItem("referencePrompt") || "");
        setAiReduceTemplate(localStorage.getItem("aiReducePrompt") || "");
        setAiCheckTemplate(localStorage.getItem("aiCheckPrompt") || "");
    }, [open]);

    // 保存模型参数到 localStorage
    const saveModelSettings = () => {
        try {
            localStorage.setItem("baseURL", baseURL);
            localStorage.setItem("apiKey", apiKey);
            localStorage.setItem("model", model);
            localStorage.setItem("temperature", temperature);
            toast.success("模型参数保存成功");
        } catch (error) {
            toast.error("保存模型参数失败");
            console.error("保存模型参数失败:", error);
        }
    };

    // 保存当前显示的模板到 localStorage
    const saveCurrentTemplate = () => {
        try {
            switch (activeTab) {
                case "polish":
                    localStorage.setItem("polishPrompt", polishTemplate);
                    break;
                case "rewrite":
                    localStorage.setItem("rewritePrompt", rewriteTemplate);
                    break;
                case "expand":
                    localStorage.setItem("expandPrompt", expandTemplate);
                    break;
                case "condense":
                    localStorage.setItem("condensePrompt", condenseTemplate);
                    break;
                case "translate":
                    localStorage.setItem("translatePrompt", translateTemplate);
                    break;
                case "reference":
                    localStorage.setItem("referencePrompt", referenceTemplate);
                    break;
                case "aiReduce":
                    localStorage.setItem("aiReducePrompt", aiReduceTemplate);
                    break;
                case "aiCheck":
                    localStorage.setItem("aiCheckPrompt", aiCheckTemplate);
                    break;
            }
            toast.success("提示词模板保存成功");
        } catch (error) {
            toast.error("保存提示词模板失败");
            console.error("保存提示词模板失败:", error);
        }
    };

    // 复原提示词模板到默认值
    const resetCurrentTemplate = () => {
        try {
            switch (activeTab) {
                case "polish":
                    setPolishTemplate(polishPrompt);
                    localStorage.setItem("polishPrompt", polishPrompt);
                    break;
                case "rewrite":
                    setRewriteTemplate(rewritePrompt);
                    localStorage.setItem("rewritePrompt", rewritePrompt);
                    break;
                case "expand":
                    setExpandTemplate(expandPrompt);
                    localStorage.setItem("expandPrompt", expandPrompt);
                    break;
                case "condense":
                    setCondenseTemplate(condensePrompt);
                    localStorage.setItem("condensePrompt", condensePrompt);
                    break;
                case "translate":
                    setTranslateTemplate(translatePrompt);
                    localStorage.setItem("translatePrompt", translatePrompt);
                    break;
                case "reference":
                    setReferenceTemplate(referencePrompt);
                    localStorage.setItem("referencePrompt", referencePrompt);
                    break;
                case "aiReduce":
                    setAiReduceTemplate(aiReducePrompt);
                    localStorage.setItem("aiReducePrompt", aiReducePrompt);
                    break;
                case "aiCheck":
                    setAiCheckTemplate(aiCheckPrompt);
                    localStorage.setItem("aiCheckPrompt", aiCheckPrompt);
                    break;
            }
            toast.success("提示词模板已复原为默认值");
        } catch (error) {
            toast.error("复原提示词模板失败");
            console.error("复原提示词模板失败:", error);
        }
    };

    // 保存所有设置
    const saveAllSettings = () => {
        saveModelSettings();
        saveCurrentTemplate();
        onOpenChange(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <AlertDialogHeader>
                    <AlertDialogTitle>设置</AlertDialogTitle>
                    <AlertDialogDescription>
                        配置模型参数和编辑提示词模板
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <Tabs defaultValue="model" value={activeTab} onValueChange={setActiveTab} className="mt-4">
                    <TabsList className="grid grid-cols-9">
                        <TabsTrigger value="model">模型</TabsTrigger>
                        <TabsTrigger value="polish">润色</TabsTrigger>
                        <TabsTrigger value="rewrite">改写</TabsTrigger>
                        <TabsTrigger value="expand">扩写</TabsTrigger>
                        <TabsTrigger value="condense">缩写</TabsTrigger>
                        <TabsTrigger value="translate">翻译</TabsTrigger>
                        <TabsTrigger value="reference">校正</TabsTrigger>
                        <TabsTrigger value="aiReduce">降重</TabsTrigger>
                        <TabsTrigger value="aiCheck">查重</TabsTrigger>
                    </TabsList>

                    {/* 模型参数设置 */}
                    <TabsContent value="model" className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label htmlFor="base-url" className="block text-sm font-medium mb-1">
                                    API 地址
                                </label>
                                <input
                                    id="base-url"
                                    type="text"
                                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                    value={baseURL}
                                    onChange={(e) => setBaseURL(e.target.value)}
                                    placeholder="例如：https://api.siliconflow.cn/v1"
                                />
                            </div>

                            <div>
                                <label htmlFor="api-key" className="block text-sm font-medium mb-1">
                                    API Key
                                </label>
                                <input
                                    id="api-key"
                                    type="password"
                                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                    value={apiKey}
                                    onChange={(e) => setAPIKey(e.target.value)}
                                    placeholder="例如：sk-xxx"
                                />
                            </div>

                            <div>
                                <label htmlFor="model" className="block text-sm font-medium mb-1">
                                    模型名称
                                </label>
                                <input
                                    id="model"
                                    type="text"
                                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                    placeholder="例如：deepseek-ai/DeepSeek-V3"
                                />
                            </div>

                            <div>
                                <label htmlFor="temperature" className="block text-sm font-medium mb-1">
                                    温度系数 (0.0 - 1.0)
                                </label>
                                <input
                                    id="temperature"
                                    type="text"
                                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                    value={temperature}
                                    onChange={(e) => setTemperature(e.target.value)}
                                    placeholder="例如：0.7"
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button onClick={saveModelSettings}>保存模型参数</Button>
                            </div>
                        </div>
                    </TabsContent>

                    {/* 文本润色提示词设置 */}
                    <TabsContent value="polish" className="space-y-4 mt-4">
                        <div>
                            <label htmlFor="polish-template" className="block text-sm font-medium mb-1">
                                文本润色提示词模板
                            </label>
                            <Textarea
                                id="polish-template"
                                className="w-full h-[400px] font-mono text-sm"
                                value={polishTemplate}
                                onChange={(e) => setPolishTemplate(e.target.value)}
                                placeholder="请输入文本润色提示词模板..."
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={resetCurrentTemplate}>复原提示词</Button>
                            <Button onClick={saveCurrentTemplate}>保存提示词模板</Button>
                        </div>
                    </TabsContent>

                    {/* 文本改写提示词设置 */}
                    <TabsContent value="rewrite" className="space-y-4 mt-4">
                        <div>
                            <label htmlFor="rewrite-template" className="block text-sm font-medium mb-1">
                                文本改写提示词模板
                            </label>
                            <Textarea
                                id="rewrite-template"
                                className="w-full h-[400px] font-mono text-sm"
                                value={rewriteTemplate}
                                onChange={(e) => setRewriteTemplate(e.target.value)}
                                placeholder="请输入文本改写提示词模板..."
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={resetCurrentTemplate}>复原提示词</Button>
                            <Button onClick={saveCurrentTemplate}>保存提示词模板</Button>
                        </div>
                    </TabsContent>

                    {/* 文本扩写提示词设置 */}
                    <TabsContent value="expand" className="space-y-4 mt-4">
                        <div>
                            <label htmlFor="expand-template" className="block text-sm font-medium mb-1">
                                文本扩写提示词模板
                            </label>
                            <Textarea
                                id="expand-template"
                                className="w-full h-[400px] font-mono text-sm"
                                value={expandTemplate}
                                onChange={(e) => setExpandTemplate(e.target.value)}
                                placeholder="请输入文本扩写提示词模板..."
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={resetCurrentTemplate}>复原提示词</Button>
                            <Button onClick={saveCurrentTemplate}>保存提示词模板</Button>
                        </div>
                    </TabsContent>

                    {/* 文本缩写提示词设置 */}
                    <TabsContent value="condense" className="space-y-4 mt-4">
                        <div>
                            <label htmlFor="condense-template" className="block text-sm font-medium mb-1">
                                文本缩写提示词模板
                            </label>
                            <Textarea
                                id="condense-template"
                                className="w-full h-[400px] font-mono text-sm"
                                value={condenseTemplate}
                                onChange={(e) => setCondenseTemplate(e.target.value)}
                                placeholder="请输入文本缩写提示词模板..."
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={resetCurrentTemplate}>复原提示词</Button>
                            <Button onClick={saveCurrentTemplate}>保存提示词模板</Button>
                        </div>
                    </TabsContent>

                    {/* 文本翻译提示词设置 */}
                    <TabsContent value="translate" className="space-y-4 mt-4">
                        <div>
                            <label htmlFor="translate-template" className="block text-sm font-medium mb-1">
                                文本翻译提示词模板
                            </label>
                            <Textarea
                                id="translate-template"
                                className="w-full h-[400px] font-mono text-sm"
                                value={translateTemplate}
                                onChange={(e) => setTranslateTemplate(e.target.value)}
                                placeholder="请输入文本翻译提示词模板..."
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={resetCurrentTemplate}>复原提示词</Button>
                            <Button onClick={saveCurrentTemplate}>保存提示词模板</Button>
                        </div>
                    </TabsContent>

                    {/* 文献格式化提示词设置 */}
                    <TabsContent value="reference" className="space-y-4 mt-4">
                        <div>
                            <label htmlFor="reference-template" className="block text-sm font-medium mb-1">
                                文献格式化提示词模板
                            </label>
                            <Textarea
                                id="reference-template"
                                className="w-full h-[400px] font-mono text-sm"
                                value={referenceTemplate}
                                onChange={(e) => setReferenceTemplate(e.target.value)}
                                placeholder="请输入文献格式化提示词模板..."
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={resetCurrentTemplate}>复原提示词</Button>
                            <Button onClick={saveCurrentTemplate}>保存提示词模板</Button>
                        </div>
                    </TabsContent>

                    {/* AI降重提示词设置 */}
                    <TabsContent value="aiReduce" className="space-y-4 mt-4">
                        <div>
                            <label htmlFor="ai-reduce-template" className="block text-sm font-medium mb-1">
                                AI降重提示词模板
                            </label>
                            <Textarea
                                id="ai-reduce-template"
                                className="w-full h-[400px] font-mono text-sm"
                                value={aiReduceTemplate}
                                onChange={(e) => setAiReduceTemplate(e.target.value)}
                                placeholder="请输入AI降重提示词模板..."
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={resetCurrentTemplate}>复原提示词</Button>
                            <Button onClick={saveCurrentTemplate}>保存提示词模板</Button>
                        </div>
                    </TabsContent>

                    {/* AI查重提示词设置 */}
                    <TabsContent value="aiCheck" className="space-y-4 mt-4">
                        <div>
                            <label htmlFor="ai-check-template" className="block text-sm font-medium mb-1">
                                AI查重提示词模板
                            </label>
                            <Textarea
                                id="ai-check-template"
                                className="w-full h-[400px] font-mono text-sm"
                                value={aiCheckTemplate}
                                onChange={(e) => setAiCheckTemplate(e.target.value)}
                                placeholder="请输入AI查重提示词模板..."
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={resetCurrentTemplate}>复原提示词</Button>
                            <Button onClick={saveCurrentTemplate}>保存提示词模板</Button>
                        </div>
                    </TabsContent>
                </Tabs>

                <AlertDialogFooter className="mt-4">
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction onClick={saveAllSettings}>保存全部</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}