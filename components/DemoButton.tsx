"use client";

import { useEffect } from "react";
import { useToast } from "@/components/ToastProvider";

export function DemoButton({
  children,
  className,
  message,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { message?: string }) {
  const { show } = useToast();
  return (
    <button
      type="button"
      className={className}
      onClick={(e) => {
        props.onClick?.(e);
        show(message ?? "Maquette — non connecté");
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export function GlobalDemoHandler() {
  const { show } = useToast();
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      show(detail ?? "Maquette — non connecté");
    };
    window.addEventListener("assia-demo-toast", handler);
    return () => window.removeEventListener("assia-demo-toast", handler);
  }, [show]);
  return null;
}
