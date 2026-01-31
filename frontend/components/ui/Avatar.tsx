import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    fallback?: string;
    size?: "sm" | "md" | "lg";
}

function Avatar({ src, alt, fallback, size = "md", className, ...props }: AvatarProps) {
    const sizes = {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-14 w-14 text-base",
    };

    return (
        <div
            className={cn(
                "relative flex shrink-0 overflow-hidden rounded-full bg-zinc-100",
                sizes[size],
                className
            )}
            {...props}
        >
            {src ? (
                <img
                    src={src}
                    alt={alt || "Avatar"}
                    className="aspect-square h-full w-full object-cover"
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center font-medium text-zinc-500">
                    {fallback || "?"}
                </div>
            )}
        </div>
    );
}

export { Avatar };
