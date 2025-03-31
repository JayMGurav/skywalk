import { Suspense } from "react";

export default async function CheckoutLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
     <Suspense>
        {children}
    </Suspense>
    );
  }
  