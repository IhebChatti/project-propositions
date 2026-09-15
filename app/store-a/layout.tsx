import { StoreLayout } from "@/components/store-shared/store-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <StoreLayout model="a">{children}</StoreLayout>;
}
