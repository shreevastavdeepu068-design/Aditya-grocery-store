import { type NextRequest, NextResponse } from 'next/server';

/**
 * Middleware for protecting admin routes
 *
 * Checks authentication and authorization before allowing access to protected routes.
 * Redirects to login if not authenticated or to home if not authorized.
 *
 * Protected routes:
 * - /admin/* - Admin panel routes (requires admin role)
 *
 * Configuration:
 * - Add new protected patterns to ADMIN_ROUTES
 * - Add new customer-only patterns to CUSTOMER_ROUTES
 */

// Admin routes that require admin role
const ADMIN_ROUTES = ['/admin'];

// Customer routes that require authentication
const CUSTOMER_ROUTES: string[] = [];

// Public routes that don't require authentication
const PUBLIC_ROUTES = ['/', '/login', '/signup', '/verify-otp'];

/**
 * Check if route matches any pattern
 */
function isRouteMatch(pathname: string, patterns: string[]): boolean {
  return patterns.some((pattern) => pathname.startsWith(pattern));
}

/**
 * Middleware function
 */
export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // Allow all public routes
  if (isRouteMatch(pathname, PUBLIC_ROUTES)) {
    return NextResponse.next();
  }

  // Get auth token from cookie
  const token = request.cookies.get('sb-auth-token')?.value;
  const userRole = request.cookies.get('user-role')?.value;

  // Check if route requires authentication
  if (isRouteMatch(pathname, ADMIN_ROUTES)) {
    // Require authentication
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Require admin role
    if (userRole !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Check customer routes
  if (isRouteMatch(pathname, CUSTOMER_ROUTES)) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

/**
 * Configure which routes the middleware should run on
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
