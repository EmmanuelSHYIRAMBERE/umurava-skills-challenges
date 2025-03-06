// app/(public)/layout.tsx
import ClientRootLayout from "@/app/ClientRootLayout";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientRootLayout>
          <Header />
          <main className="flex-grow pt-16 max-w-6xl mx-auto">{children}</main>
          <Footer />
        </ClientRootLayout>
      </body>
    </html>
  );
}
