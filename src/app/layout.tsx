import {
  ClerkProvider,
  SignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-100 text-gray-900">
          <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">Ticket Booker</h1>
            <div className="flex items-center space-x-4">
              <SignedIn>
                <UserButton showName />
              </SignedIn>
            </div>
          </header>

          <main className="container mx-auto mt-8 p-4">
            <SignedOut>
              <div className="flex justify-center items-center min-h-screen">
                <SignIn routing="hash" />
              </div>
            </SignedOut>

            <SignedIn>{children}</SignedIn>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
