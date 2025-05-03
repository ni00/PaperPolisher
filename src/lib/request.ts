import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

export const requestOpenAI = async (systemPrompt: string, userPrompt: string): Promise<string> => {
    try {
        // 从 localStorage 获取 API 配置
        const openai = createOpenAI({
            baseURL: localStorage.getItem("baseURL") || 'https://api.siliconflow.cn/v1',
            apiKey: localStorage.getItem("apiKey") || '',
            compatibility: 'compatible',
        });
        // 从 localStorage 获取模型和温度参数
        const model = openai(localStorage.getItem("model") || 'deepseek-ai/DeepSeek-V3');
        const temperature = parseFloat(localStorage.getItem("temperature") || '0.7');

        const { text } = await generateText({
            model: model,
            system: systemPrompt,
            prompt: userPrompt,
            temperature: temperature,
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
