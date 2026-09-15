import type { ReactNode } from "react";
import type { StoreModel } from "@/lib/mock-data";
import { StoreCartProvider } from "@/components/store-shared/StoreCartProvider";

export function StoreLayout({ model, children }: { model: StoreModel; children: ReactNode }) {
  return <StoreCartProvider model={model}>{children}</StoreCartProvider>;
}
