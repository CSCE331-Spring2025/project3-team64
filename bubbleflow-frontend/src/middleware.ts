import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

//Handle route protection for pages that require a sign in

export async function middleware(req: NextRequest) {
  console.log("test");
  try {
    // Extract JWT token from the request (NextRequest)
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    console.log("Token:", token);

    // List of protected routes
    const protectedRoutes = ["/edit-menu", "/manage-employees", "/order-history", 
      "/view-inventory", "/reports", "/select-role", "/create-order", "/view-order"
    ];

    // Check if the current route is protected and if no token exists
    if (protectedRoutes.some(route => req.url.includes(route)) && !token) {
      console.log("No token found, redirecting to login...");

      const url = new URL("/", req.url);
      url.searchParams.set("error", "AccessDenied");
      return NextResponse.redirect(url); // Redirect to login
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.redirect(new URL("/", req.url)); // Redirect on error
  }
}

// Match these routes and protect them
export const config = {
  matcher: ["/edit-menu", "/manage-employees", "/order-history", 
      "/view-inventory", "/reports", "/select-role", "/create-order", "/view-order"
    ],
};
