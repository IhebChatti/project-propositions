import StoreExperience from "@/components/store-shared/StoreExperience";
import { PRODUCTS } from "@/lib/mock-data";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export default async function StoreAProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <StoreExperience model="b" variant="product" productId={id} />;
}
