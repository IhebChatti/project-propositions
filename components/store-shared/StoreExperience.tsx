"use client";

import type { StoreExperienceProps } from "@/lib/store-types";
import MaisonExperience from "@/components/store-a/MaisonExperience";
import GrossisteExperience from "@/components/store-b/GrossisteExperience";
import SugarLabExperience from "@/components/store-c/SugarLabExperience";

export default function StoreExperience({ model, variant, productId }: StoreExperienceProps) {
  if (model === "a") {
    return <MaisonExperience variant={variant} productId={productId} />;
  }
  if (model === "b") {
    return <GrossisteExperience variant={variant} productId={productId} />;
  }
  return <SugarLabExperience variant={variant} productId={productId} />;
}
