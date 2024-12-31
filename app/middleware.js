export { default } from "next-auth/middleware"


// Define paths to apply the middleware
export const config = {
  matcher: [
    ["/train/:path*"], 
  ],
};
