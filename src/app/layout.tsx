import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/lib/theme-provider";
import Image from "next/image";

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
        <body className="antialiased bg-black text-white">
          <div className="hidden lg:flex">
            <ThemeProvider>{children}</ThemeProvider>
            <Toaster />
          </div>
          <div className="lg:hidden flex justify-center items-center w-screen h-screen flex-col space-y-5 p-3">
            <Image src="/desktop.png" width={200} height={200} alt="desktop" />
            <h3 className="text-xl font-semibold text-center">
              Quirk V1 is Available Only on Desktop
            </h3>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
