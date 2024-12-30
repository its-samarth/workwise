import NextAuth from "next-auth";
import { authOptions } from "./authOptions"; // Import from the new authOptions file

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
