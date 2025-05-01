import { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { checkUpdate, UpdateInfo } from '@/lib/utils';

interface UpdateNotificationProps {
    currentVersion: string;
}

export function UpdateNotification({ currentVersion }: UpdateNotificationProps) {
    const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        // 应用启动时自动检查更新
        const checkForUpdates = async () => {
            try {
                const info = await checkUpdate(currentVersion);
                setUpdateInfo(info);
                if (info.hasUpdate) {
                    // 如果有更新，显示对话框
                    setDialogOpen(true);
                }
            } catch (error) {
                console.error('自动检查更新失败:', error);
            }
        };

        // 执行更新检查
        checkForUpdates();
    }, [currentVersion]);

    // 前往下载页面
    const handleGoToDownload = () => {
        if (updateInfo) {
            window.open(updateInfo.releaseUrl, '_blank');
        }
        setDialogOpen(false);
    };

    if (!updateInfo?.hasUpdate) {
        return null;
    }

    return (
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>发现新版本</AlertDialogTitle>
                    <AlertDialogDescription>
                        当前版本: {currentVersion}<br />
                        最新版本: {updateInfo.latestVersion}<br /><br />
                        有新版本可用，是否前往下载页面?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>稍后提醒</AlertDialogCancel>
                    <AlertDialogAction onClick={handleGoToDownload}>
                        前往下载
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}