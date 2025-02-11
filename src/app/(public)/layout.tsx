// app/(public)/layout.tsx

import Footer from "@/components/Footer";
import Header from "@/components/Header";


export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-grow pt-16 max-w-6xl mx-auto">{children}</main>
      <Footer />
    </>
  );
}
