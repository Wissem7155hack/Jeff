import { NextResponse } from 'next/server';

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, newPassword } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();

    // 1. Fetch user from Clerk
    const userRes = await fetch(`https://api.clerk.com/v1/users?email_address=${encodeURIComponent(trimmedEmail)}`, {
      headers: {
        Authorization: `Bearer ${CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!userRes.ok) {
      const errData = await userRes.json();
      return NextResponse.json({ error: 'Failed to query user records', details: errData }, { status: 500 });
    }

    const users = await userRes.json();
    if (!Array.isArray(users) || users.length === 0) {
      return NextResponse.json({ error: 'No account found with this email address' }, { status: 404 });
    }

    const user = users[0];

    // 2. If newPassword is provided, update password directly
    if (newPassword && typeof newPassword === 'string') {
      if (newPassword.length < 8) {
        return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
      }

      const updateRes = await fetch(`https://api.clerk.com/v1/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!updateRes.ok) {
        const errData = await updateRes.json();
        return NextResponse.json({ error: 'Password update rejected by authentication provider', details: errData }, { status: 400 });
      }

      return NextResponse.json({ success: true, message: 'Password updated successfully. You may now sign in.' });
    }

    // 3. Otherwise generate instant sign-in ticket token
    const tokenRes = await fetch('https://api.clerk.com/v1/sign_in_tokens', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: user.id }),
    });

    if (!tokenRes.ok) {
      const errData = await tokenRes.json();
      return NextResponse.json({ error: 'Failed to generate sign-in token', details: errData }, { status: 500 });
    }

    const tokenData = await tokenRes.json();
    return NextResponse.json({
      success: true,
      message: 'Sign-in link created successfully',
      url: tokenData.url,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
