import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 定义接口用于表示版本信息
export interface UpdateInfo {
  hasUpdate: boolean;
  currentVersion: string;
  latestVersion: string;
  releaseUrl: string;
}

// 解析版本号为数组，以便进行版本比较
export function parseVersion(version: string): number[] {
  return version
    .replace(/^v/, '') // 移除版本号前的v前缀（如v1.0.0）
    .split('.')
    .map(Number);
}

// 比较两个版本号，如果v1 < v2返回-1，v1 = v2返回0，v1 > v2返回1
export function compareVersions(v1: string, v2: string): number {
  const v1Parts = parseVersion(v1);
  const v2Parts = parseVersion(v2);

  const maxLength = Math.max(v1Parts.length, v2Parts.length);

  for (let i = 0; i < maxLength; i++) {
    const v1Part = v1Parts[i] || 0;
    const v2Part = v2Parts[i] || 0;

    if (v1Part < v2Part) return -1;
    if (v1Part > v2Part) return 1;
  }

  return 0;
}

// 检查更新
export async function checkUpdate(currentVersion: string): Promise<UpdateInfo> {
  try {
    const response = await fetch('https://api.github.com/repos/ni00/PaperPolisher/releases/latest');
    if (!response.ok) {
      throw new Error('检查更新失败，请稍后重试');
    }

    const data = await response.json();
    const latestVersion = data.tag_name || data.name;
    const hasUpdate = compareVersions(currentVersion, latestVersion) < 0;

    return {
      hasUpdate,
      currentVersion,
      latestVersion,
      releaseUrl: 'https://github.com/ni00/PaperPolisher/releases'
    };
  } catch (error) {
    console.error('检查更新出错:', error);
    throw error;
  }
}
