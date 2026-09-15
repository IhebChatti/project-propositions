import type { StoreModel } from "@/lib/mock-data";

export type StoreVariant = "home" | "catalogue" | "product" | "cart" | "compte" | "search" | "app";

export type StoreExperienceProps = {
  model: StoreModel;
  variant: StoreVariant;
  productId?: string;
};

export function storeRoot(model: StoreModel): string {
  return `/store-${model}`;
}
