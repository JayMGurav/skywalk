import { Suspense } from "react";

export default async function FlightResultsLayout({
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
  