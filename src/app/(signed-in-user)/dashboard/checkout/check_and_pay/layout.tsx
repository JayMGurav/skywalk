import { Suspense } from "react";

export default async function CheckAndPayLayout({
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
  