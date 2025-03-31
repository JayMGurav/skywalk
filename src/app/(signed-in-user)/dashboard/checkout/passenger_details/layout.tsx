import { Suspense } from "react";

export default async function PassengerDetialsLayout({
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
  