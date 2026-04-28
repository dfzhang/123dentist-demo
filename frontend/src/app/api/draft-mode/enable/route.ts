import { cookies, draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

// Manual draft mode enable route — replaces defineEnableDraftMode
// which has a Turbopack compatibility issue with Next.js 16.
//
// IMPORTANT: We return a 200 with an HTML redirect instead of a 307.
// Reason: The Fly.io tunnel proxy follows server-side redirects internally,
// which strips the set-cookie header from the intermediate response.
// The browser never receives the __prerender_bypass cookie, so draft mode
// doesn't activate. By returning a 200 with the cookie + a client-side
// redirect (meta refresh), the browser receives and stores the cookie
// before navigating to the target page.
//
// The Presentation tool loads this URL in its iframe. The iframe needs:
// 1. The __prerender_bypass cookie (with SameSite=None for cross-origin)
// 2. A redirect to the actual preview page
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug') || '/'

  // Enable draft mode — sets __prerender_bypass cookie
  const dm = await draftMode()
  if (!dm.isEnabled) {
    dm.enable()
  }

  // Re-set the cookie with cross-origin-safe attributes.
  // The Presentation tool iframe is cross-origin (Studio domain ≠ Frontend domain),
  // so SameSite=Lax (Next.js default) blocks the cookie. Need SameSite=None + Secure.
  const isSecure =
    process.env.NODE_ENV === 'production' ||
    request.headers.get('x-forwarded-proto') === 'https' ||
    request.nextUrl.protocol === 'https:'
  const cookieStore = await cookies()
  const bypassCookie = cookieStore.get('__prerender_bypass')

  if (bypassCookie?.value) {
    cookieStore.set({
      name: '__prerender_bypass',
      value: bypassCookie.value,
      httpOnly: true,
      path: '/',
      secure: isSecure,
      sameSite: isSecure ? 'none' : 'lax',
    })
  }

  // Return a 200 with HTML that redirects client-side.
  // This ensures the browser receives the set-cookie header before navigating.
  // A server-side redirect (307) would be followed by the reverse proxy,
  // stripping the cookie from the response.
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0;url=${encodeURI(slug)}" />
</head>
<body>
  <script>window.location.href = ${JSON.stringify(slug)}</script>
</body>
</html>`

  return new NextResponse(html, {
    status: 200,
    headers: { 'content-type': 'text/html' },
  })
}
