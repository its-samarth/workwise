import GithubProvider from "next-auth/providers/github";
export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    // Add other providers if needed
  ],
  callbacks: {
    async redirect({ baseUrl }: { baseUrl: string }) {
      return baseUrl; // Redirect to the home page after login
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};