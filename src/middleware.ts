import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

const NOT_AUTH_URL = "/404";

function isAuthorized(session: any, pathname: any) {
  if (session) {
    const userRole = session.user.userRole;

    if (userRole === "user" && pathname.startsWith("/admin")) {
      return false;
    }

    if (userRole === "seller") {
      const sellerPaths = ["/admin/orders", "/admin/shop"];
      const isSellerPath = sellerPaths.some((path) =>
        pathname.startsWith(path),
      );
      if (pathname.startsWith("/user")) {
        return true;
      } else if (!isSellerPath) return false;
    }

    if (userRole === "spa") {
      if (pathname.startsWith("/user")) {
        return true;
      } else if (!pathname.startsWith("/admin/bookings")) {
        return false;
      }
    }

    const restrictedPaths = ["/admin/add-product", "/admin/shop/edit-product/"];
    const isRestricted = restrictedPaths.some((path) =>
      pathname.startsWith(path),
    );
    if (isRestricted && !["admin", "manager"].includes(userRole)) {
      return false;
    }
  } else {
    if (pathname.startsWith("/user") || pathname.startsWith("/admin")) {
      return false;
    }
  }

  return true;
}

export default withAuth(
  async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const session = (req as any).nextauth.token;

    if (session && pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (!isAuthorized(session, pathname)) {
      return NextResponse.redirect(new URL(NOT_AUTH_URL, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);

export const config = {
  matcher: ["/user/:path*", "/admin/:path*", "/auth"],
};
