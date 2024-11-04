import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";

export const metadata: Metadata = {
  title: "Quirk",
  description: "Automate Your GitHub Workflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorBackground: "black",
          colorText: "white",
          colorTextOnPrimaryBackground: "white",
          colorTextSecondary: "white",
          colorInputBackground: "black",
          fontSize: "1rem",
        },
        elements: {
          socialButtonsBlockButtonText: "text-white",
          headerTitle: "my-3",
          headerSubtitle: "hidden",
          borderRadius: "0rem",
        },
      }}
    >
      <html lang="en">
        <body className="antialiased bg-black text-white">{children}</body>
      </html>
    </ClerkProvider>
  );
}
