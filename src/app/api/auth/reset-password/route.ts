import { NextResponse } from 'next/server';

/**
 * DEPRECATED AND DISABLED FOR SECURITY COMPLIANCE (CWE-640 / CVSS 9.8).
 * 
 * Pre-authentication remote password resetting or sign-in token generation
 * without verified proof of email ownership is permanently disabled.
 * 
 * Password resets must be initiated client-side through Clerk's secure challenge:
 * clerk.client.signIn.create({ strategy: 'reset_password_email_code', identifier: email })
 */
export async function POST() {
  return NextResponse.json(
    {
      error: 'Direct password reset endpoint has been permanently disabled for security compliance. Please use Clerk account recovery.',
      code: 'insecure_endpoint_disabled'
    },
    { status: 410 }
  );
}
