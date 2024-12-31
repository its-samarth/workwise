import GithubProvider from "next-auth/providers/github";
import prisma from "../../../lib/prisma"; // import your Prisma client
import { User as NextAuthUser, Account, Profile, Session as NextAuthSession } from "next-auth";

interface User extends NextAuthUser {
  id: string;
}
import { JWT } from "next-auth/jwt";

interface Session extends NextAuthSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}


export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
   
  ],
  callbacks: {
    async signIn({
      user,
      profile,
    }: {
      user: User;
      account: Account;
      profile: Profile;
    }) {
      // console.log("signIn callback triggered");
      // console.log("Received user:", user);
      // console.log("Received account:", account);
      // console.log("Received profile:", profile);

      try {
        // Check if the user already exists in the database
        let existingUser = await prisma.user.findUnique({
          where: { email: user.email ?? undefined },
        });

        // console.log("Existing user found:", existingUser);

        // If the user does not exist, create the user in the database
        if (!existingUser) {
          // console.log("Creating new user...");
          existingUser = await prisma.user.create({
            data: {
              name: user.name || profile.name || "Unknown", 
              email: user.email ?? "unknown@example.com",
              image_url: user.image, // Profile image URL from GitHub
            },
          });

          // console.log("New user created:", existingUser);
        }

        // Pass the user id to the JWT token (for use in session)
        user.id = existingUser.id.toString();
        // console.log("User ID assigned to token:", user.id);

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    async jwt({ token, user }: { token: JWT; user: User | undefined }) {
      // console.log("jwt callback triggered");

      if (user) {
        // console.log("Adding user data to JWT:", user);
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image_url = user.image; 
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      // console.log("session callback triggered");
      // console.log("Received token in session:", token);

      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image_url as string; 
        // console.log("Session user data:", session.user);
      }

      return session;
    },
    // Redirect user after sign in
    async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};