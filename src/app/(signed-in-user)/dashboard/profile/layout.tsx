import { Suspense } from "react";

export default async function ProfileLayout({
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
  