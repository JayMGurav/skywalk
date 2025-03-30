export default function SignedInUserRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className="max-w-7xl px-4 w-full mx-auto">{children}</main>
  );
}
