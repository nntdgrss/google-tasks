import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Задачи",
  description: "Планируйте ваш день с помощью задач",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
