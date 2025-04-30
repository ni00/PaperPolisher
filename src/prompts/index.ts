// 导入各个独立的prompt文件
import { enhancePrompt } from './enhance';
import { revisePrompt } from './revise';
import { expandPrompt } from './expand';
import { summaryPrompt } from './summary';
import { translatePrompt } from './translate';

// 导出所有prompt
export const prompts = {
    zh: {
        // 润色
        enhance: enhancePrompt,
        // 改写
        revise: revisePrompt,
        // 扩写
        expand: expandPrompt,
        // 摘要
        summary: summaryPrompt,
        // 译写
        translate: translatePrompt
    }
};

// 单独导出每个prompt以便直接使用
export { enhancePrompt, revisePrompt, expandPrompt, summaryPrompt, translatePrompt };