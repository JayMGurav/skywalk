import { Suspense } from "react";

export default async function RootLayout({
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
  