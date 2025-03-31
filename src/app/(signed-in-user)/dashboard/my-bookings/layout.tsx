export default async function MyBookingsLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div>
        {children}
      </div>
    );
  }
  