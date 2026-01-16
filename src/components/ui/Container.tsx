import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
    as?: React.ElementType;
}

export function Container({
    as = "div",
    className,
    children,
    ...props
}: ContainerProps) {
    const Component = as as any;
    return (
        <Component
            className={cn(
                "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
}
