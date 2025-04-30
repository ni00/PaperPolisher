import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

export const requestOpenAI = async (systemPrompt: string, userPrompt: string): Promise<string> => {
    try {
        // 默认使用硅基流动的API
        const openai = createOpenAI({
            baseURL: localStorage.getItem("baseURL") || 'https://api.siliconflow.cn/v1',
            apiKey: localStorage.getItem("apiKey") || 'sk-xxx',
            compatibility: 'compatible',
        });
        // 默认使用DeepSeek-V3模型
        const model = openai(localStorage.getItem("model") || 'deepseek-ai/DeepSeek-V3');

        const { text } = await generateText({
            model: model,
            system: systemPrompt,
            prompt: userPrompt,
            temperature: 0.7,
        });

        return text;
    } catch (error) {
        console.error('API请求失败:', error);
        if (error instanceof Error && error?.message) {
            return `请求失败: ${error.message}`;
        } else {
            return '请求失败，请检查网络连接和API配置后重试';
        }
    }
}
