"use client";

import { CircleCheck, Info, LoaderCircle, OctagonAlert, TriangleAlert } from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      icons={{
        success: <CircleCheck className="size-4" />,
        info: <Info className="size-4" />,
        warning: <TriangleAlert className="size-4" />,
        error: <OctagonAlert className="size-4" />,
        loading: <LoaderCircle className="size-4 animate-spin" />,
      }}
      style={{
        "--normal-bg": "white",
        "--normal-text": "#10284b",
        "--normal-border": "#dce9f8",
        "--border-radius": "14px",
      } as React.CSSProperties}
      {...props}
    />
  );
}
