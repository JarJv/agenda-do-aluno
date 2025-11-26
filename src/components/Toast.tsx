import '../assets/style.css'
import { CheckCircle, XCircle, X, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ToastProps {
    type: 'success' | 'error' | 'loading';
    message: string;
    isVisible?: boolean;
    onClose?: () => void;
    duration?: number;
    position?: 'top' | 'bottom';
}

export default function Toast({ type, message, isVisible = true, onClose, duration = 5000, position = 'top' }: ToastProps) {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (!isVisible || type === 'loading') return;

        const startTime = Date.now();
        const endTime = startTime + duration;

        const updateProgress = () => {
            const now = Date.now();
            const remaining = Math.max(0, endTime - now);
            const newProgress = (remaining / duration) * 100;

            setProgress(newProgress);

            if (remaining > 0) {
                requestAnimationFrame(updateProgress);
            } else {
                onClose?.();
            }
        };

        const timer = setTimeout(() => {
            onClose?.();
        }, duration);

        updateProgress();

        return () => clearTimeout(timer);
    }, [isVisible, duration, onClose, type]);

    if (!isVisible) return null;

    const isSuccess = type === 'success';
    const isLoading = type === 'loading';

    const bgColor = isSuccess
        ? 'bg-green-500'
        : isLoading
        ? 'bg-blue-500'
        : 'bg-red-500';

    const iconColor = '#ffffff';
    const textColor = 'text-white';

    return (
        <article className={`
            ${bgColor}
            w-full left-0 right-0
            flex flex-col
            ${position === 'bottom' ? 'fixed bottom-0' : 'fixed bottom-20'}
            shadow-2xl border-t border-white/20
            backdrop-blur-sm
            animate-in slide-in-from-bottom fade-in
            duration-300
            z-50
        `}>
            <div className="flex items-center justify-center gap-x-3 p-4">
                {isSuccess ? (
                    <CheckCircle size={28} color={iconColor} />
                ) : isLoading ? (
                    <Loader2 size={28} color={iconColor} className="animate-spin" />
                ) : (
                    <XCircle size={28} color={iconColor} />
                )}
                <p className={`${textColor} text-lg font-semibold leading-tight text-center`}>
                    {message}
                </p>
                {onClose && !isLoading && (
                    <button
                        onClick={onClose}
                        className="
                            shrink-0 p-1 rounded-full
                            hover:bg-white/20 transition-colors
                            duration-200 ml-2
                        "
                        aria-label="Fechar notificação"
                    >
                        <X size={20} color={iconColor} />
                    </button>
                )}
            </div>

            {!isLoading && (
                <div className="w-full h-1 bg-white/20">
                    <div
                        className="h-full bg-white transition-all duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}
        </article>
    );
}