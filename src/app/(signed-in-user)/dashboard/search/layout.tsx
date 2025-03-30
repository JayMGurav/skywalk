export default async function RootLayout({
    children,
    booking
  }: Readonly<{
    children: React.ReactNode;
    booking: React.ReactNode;
  }>) {
    return (
    <div className="max-w-7xl mx-auto rounded-lg py-10 px-4">
        {booking}
        {children}
      </div>
    );
  }
  