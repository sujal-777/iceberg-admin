import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean; // allows rendering as another component (e.g. Link)
  variant?: "default" | "destructive" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

const variants = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
};

const sizes = {
  default: "h-10 px-4 py-2",
  sm: "h-8 px-3",
  lg: "h-12 px-6",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        className={clsx(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
