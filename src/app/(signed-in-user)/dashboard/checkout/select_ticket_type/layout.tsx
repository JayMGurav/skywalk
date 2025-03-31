import { Suspense } from "react";

export default async function SelectTicketTypeLayout({
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
  