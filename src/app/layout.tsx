import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/toaster";

const font = DM_Sans({ subsets: ["latin"] });

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
      afterSignOutUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL}
      signInFallbackRedirectUrl={
        process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
      }
      signUpFallbackRedirectUrl={
        process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
      }
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
        <body className={"antialiased bg-black text-white " + font.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
