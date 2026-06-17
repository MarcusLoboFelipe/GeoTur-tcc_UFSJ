import "leaflet/dist/leaflet.css";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen w-full bg-gray-200">

        {children}

      </body>
    </html>
  );
}