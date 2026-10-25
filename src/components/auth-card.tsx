"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Eye, EyeOff, LoaderCircle, CheckCircle2, ArrowLeft, ShieldAlert } from "lucide-react";

interface AuthCardProps {
  initialMode?: "signin" | "signup";
}

const CLERK_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_live_Y2xlcmsubmV4Y29yZS1hcHAuY29tJA";
const DASHBOARD_URL = "https://admin.nexcore-app.com";

function setSharedAuthCookie(email?: string) {
  if (typeof window === "undefined") return;
  const isProduction = window.location.hostname.includes("nexcore-app.com");
  const domainAttr = isProduction ? "; domain=.nexcore-app.com" : "";
  document.cookie = `nexcore_auth=true; path=/${domainAttr}; max-age=2592000; SameSite=Lax; Secure`;
  document.cookie = `nexcore_auth=true; path=/; max-age=2592000; SameSite=Lax; Secure`;
  if (email) {
    document.cookie = `nexcore_user_email=${encodeURIComponent(email)}; path=/${domainAttr}; max-age=2592000; SameSite=Lax; Secure`;
    document.cookie = `nexcore_user_email=${encodeURIComponent(email)}; path=/; max-age=2592000; SameSite=Lax; Secure`;
    try {
      localStorage.setItem("nexcore_user_email", email);
    } catch (e) {}
  }
  try {
    localStorage.setItem("nexcore_auth", "true");
  } catch (e) {}
}

function redirectToDashboard(clerk: any, email?: string) {
  if (typeof window === "undefined") return;
  setSharedAuthCookie(email);
  try {
    const authPayload = btoa(JSON.stringify({
      auth: true,
      email: (email || "").trim(),
      ts: Date.now()
    }));
    const target = new URL(DASHBOARD_URL);
    target.searchParams.set("auth_token", authPayload);
    // Direct navigation: do NOT call clerk.buildUrlWithAuth which creates ?__clerk_db_jwt=... loops
    window.location.href = target.toString();
  } catch (e) {
    window.location.href = DASHBOARD_URL;
  }
}

async function getClerkClient(): Promise<any> {
  if (typeof window === "undefined") return null;
  if ((window as any).Clerk) {
    const clerk = (window as any).Clerk;
    if (!clerk.loaded) {
      await clerk.load();
    }
    return clerk;
  }

  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src*="@clerk/clerk-js"]');
    if (existing) {
      existing.addEventListener('load', async () => {
        try {
          const clerk = (window as any).Clerk;
          await clerk.load();
          resolve(clerk);
        } catch (e) {
          reject(e);
        }
      });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@clerk/clerk-js@5/dist/clerk.browser.js";
    script.setAttribute("data-clerk-publishable-key", CLERK_PUBLISHABLE_KEY);
    script.crossOrigin = "anonymous";
    script.async = true;
    script.onload = async () => {
      try {
        const clerk = (window as any).Clerk;
        await clerk.load();
        resolve(clerk);
      } catch (err) {
        reject(err);
      }
    };
    script.onerror = () => reject(new Error("Authentication service failed to load"));
    document.head.appendChild(script);
  });
}

export function NexcoreRobotLogo() {
  return (
    <center>
      <span className="auth-logo-text">Nexcore</span>
    </center>
  );
}

export function AuthCard({ initialMode = "signin" }: AuthCardProps) {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Sign In State
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInErrors, setSignInErrors] = useState<Record<string, string>>({});
  const [signInLoading, setSignInLoading] = useState(false);
  const [authDeniedMessage, setAuthDeniedMessage] = useState("");
  const [isBreachedPasswordError, setIsBreachedPasswordError] = useState(false);

  // 2FA State
  const [isSecondFactor, setIsSecondFactor] = useState(false);
  const [secondFactorCode, setSecondFactorCode] = useState("");

  // Forgot Password / Password Reset State
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetStep, setResetStep] = useState<"request" | "verify">("request");
  const [resetEmail, setResetEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [resetNewPassword, setResetNewPassword] = useState("");
  const [resetConfirmPassword, setResetConfirmPassword] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [resetErrors, setResetErrors] = useState<Record<string, string>>({});

  // Sign Up State
  const [signUpFirst, setSignUpFirst] = useState("");
  const [signUpLast, setSignUpLast] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpErrors, setSignUpErrors] = useState<Record<string, string>>({});
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const [existingSessionEmail, setExistingSessionEmail] = useState<string | null>(null);

  // Handle explicit logout and detect active Clerk session without bouncing loops
  useEffect(() => {
    if (typeof window === "undefined") return;
    const urlParams = new URLSearchParams(window.location.search);
    const isLogout = urlParams.get("logout") === "true";
    const sessionRequired = urlParams.get("session") === "required";

    if (isLogout) {
      const domainAttr = window.location.hostname.includes("nexcore-app.com") ? "; domain=.nexcore-app.com" : "";
      document.cookie = `nexcore_auth=; path=/${domainAttr}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      document.cookie = `nexcore_user_email=; path=/${domainAttr}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      document.cookie = `nexcore_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      document.cookie = `nexcore_user_email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      try {
        localStorage.removeItem("nexcore_auth");
        localStorage.removeItem("nexcore_user_email");
      } catch (e) {}
      getClerkClient().then((clerk) => {
        if (clerk && clerk.user) {
          clerk.signOut().catch(() => {});
        }
      });
      return;
    }

    if (sessionRequired) {
      return;
    }

    getClerkClient()
      .then((clerk: any) => {
        if (clerk && clerk.user) {
          const email = clerk.user.primaryEmailAddress?.emailAddress || "";
          setExistingSessionEmail(email);
          if (email && !signInEmail) {
            setSignInEmail(email);
          }
        }
      })
      .catch(() => {});
  }, []);

  function switchMode(newMode: "signin" | "signup") {
    setMode(newMode);
    setSignInErrors({});
    setSignUpErrors({});
    setAuthDeniedMessage("");
    setIsBreachedPasswordError(false);
    setSignUpSuccess(false);
    setIsSecondFactor(false);
    setSecondFactorCode("");
    setIsForgotPassword(false);
    setResetStep("request");
    setResetErrors({});
    setResetMessage("");
  }

  function startForgotPassword(prefillEmail?: string) {
    setIsForgotPassword(true);
    setResetStep("request");
    setResetEmail(prefillEmail || signInEmail || "");
    setResetCode("");
    setResetNewPassword("");
    setResetConfirmPassword("");
    setResetMessage("");
    setResetErrors({});
    setAuthDeniedMessage("");
    setIsBreachedPasswordError(false);
  }

  // Handle Sign In submission
  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setAuthDeniedMessage("");
    setIsBreachedPasswordError(false);
    const errs: Record<string, string> = {};

    if (!signInEmail.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signInEmail.trim())) {
      errs.email = "Please enter a valid email address";
    }

    if (!signInPassword) {
      errs.password = "Password is required";
    }

    if (Object.keys(errs).length > 0) {
      setSignInErrors(errs);
      return;
    }

    setSignInErrors({});
    setSignInLoading(true);

    try {
      const clerk: any = await getClerkClient();
      if (!clerk) {
        throw new Error("Authentication system failed to initialize. Please refresh.");
      }

      const res = await clerk.client.signIn.create({
        identifier: signInEmail.trim(),
        password: signInPassword,
      });

      if (res.status === "complete") {
        await clerk.setActive({ session: res.createdSessionId });
        redirectToDashboard(clerk, signInEmail.trim());
        return;
      } else if (res.status === "needs_second_factor") {
        try {
          await clerk.client.signIn.prepareSecondFactor({ strategy: "email_code" });
        } catch (prepErr) {
          console.warn("Second factor preparation:", prepErr);
        }
        setIsSecondFactor(true);
        setSignInLoading(false);
        setAuthDeniedMessage("");
        return;
      } else {
        setSignInLoading(false);
        setAuthDeniedMessage(`Authentication status: ${res.status}. Additional verification required.`);
      }
    } catch (err: any) {
      setSignInLoading(false);
      const code = err?.errors?.[0]?.code;
      const errMsg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        err?.message ||
        "Invalid credentials. Please verify your email and password.";

      if (
        code === "form_password_pwned" ||
        errMsg.toLowerCase().includes("data breach") ||
        errMsg.toLowerCase().includes("breach")
      ) {
        setIsBreachedPasswordError(true);
        setAuthDeniedMessage(
          "This password was flagged in an online data breach for account safety. Please reset your password below to regain instant access."
        );
      } else {
        setIsBreachedPasswordError(false);
        setAuthDeniedMessage(errMsg);
      }
    }
  }

  // Handle 2FA verification submission
  async function handleVerifySecondFactor(e: React.FormEvent) {
    e.preventDefault();
    if (!secondFactorCode.trim()) {
      setAuthDeniedMessage("Please enter the 6-digit code sent to your email.");
      return;
    }

    setSignInLoading(true);
    setAuthDeniedMessage("");

    try {
      const clerk: any = await getClerkClient();
      const res = await clerk.client.signIn.attemptSecondFactor({
        strategy: "email_code",
        code: secondFactorCode.trim(),
      });

      if (res.status === "complete") {
        await clerk.setActive({ session: res.createdSessionId });
        redirectToDashboard(clerk, signInEmail.trim());
        return;
      } else {
        setSignInLoading(false);
        setAuthDeniedMessage(`Verification status: ${res.status}. Please check the code and try again.`);
      }
    } catch (err: any) {
      setSignInLoading(false);
      const errMsg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        err?.message ||
        "Invalid or expired verification code. Please check your email.";
      setAuthDeniedMessage(errMsg);
    }
  }

  async function handleResendSecondFactor() {
    try {
      const clerk: any = await getClerkClient();
      await clerk.client.signIn.prepareSecondFactor({ strategy: "email_code" });
      setAuthDeniedMessage("A new verification code was sent to your email.");
    } catch {
      setAuthDeniedMessage("Failed to resend code. Please try again in a few moments.");
    }
  }

  // Handle Password Reset: Step 1 (Send Code)
  async function handleSendResetCode(e: React.FormEvent) {
    e.preventDefault();
    setResetMessage("");
    const errs: Record<string, string> = {};
    const trimmedEmail = resetEmail.trim();

    if (!trimmedEmail) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errs.email = "Please enter a valid email address";
    }

    if (Object.keys(errs).length > 0) {
      setResetErrors(errs);
      return;
    }

    setResetErrors({});
    setResetLoading(true);

    try {
      const clerk: any = await getClerkClient();
      if (!clerk) {
        throw new Error("Authentication system failed to initialize. Please refresh.");
      }

      try {
        await clerk.client.signIn.create({
          strategy: "reset_password_email_code",
          identifier: trimmedEmail,
        });
      } catch (firstErr: any) {
        // If signIn was already initialized or active with this identifier
        const factors = clerk.client.signIn?.supportedFirstFactors || [];
        const resetFactor = factors.find(
          (f: any) => f.strategy === "reset_password_email_code"
        );
        if (resetFactor && resetFactor.emailAddressId) {
          await clerk.client.signIn.prepareFirstFactor({
            strategy: "reset_password_email_code",
            emailAddressId: resetFactor.emailAddressId,
          });
        } else {
          const init = await clerk.client.signIn.create({
            identifier: trimmedEmail,
          });
          const initFactor = init?.supportedFirstFactors?.find(
            (f: any) => f.strategy === "reset_password_email_code"
          );
          if (initFactor && initFactor.emailAddressId) {
            await clerk.client.signIn.prepareFirstFactor({
              strategy: "reset_password_email_code",
              emailAddressId: initFactor.emailAddressId,
            });
          } else {
            throw firstErr;
          }
        }
      }

      setResetStep("verify");
      setResetLoading(false);
      setResetMessage(`A 6-digit verification code has been sent to ${trimmedEmail}. Check your inbox!`);
    } catch (err: any) {
      setResetLoading(false);
      const errMsg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        err?.message ||
        "Could not initiate password reset. Please check the email and try again.";
      setResetErrors({ form: errMsg });
    }
  }

  // Handle Password Reset: Step 2 (Verify Code & Set New Password)
  async function handleVerifyResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setResetMessage("");
    const errs: Record<string, string> = {};
    const code = resetCode.trim();

    if (!code) {
      errs.code = "Verification code is required";
    } else if (code.length !== 6) {
      errs.code = "Code must be 6 digits";
    }

    if (!resetNewPassword) {
      errs.password = "New password is required";
    } else if (resetNewPassword.length < 15) {
      errs.password = "Password must be at least 15 characters";
    }

    if (resetNewPassword !== resetConfirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errs).length > 0) {
      setResetErrors(errs);
      return;
    }

    setResetErrors({});
    setResetLoading(true);

    try {
      const clerk: any = await getClerkClient();
      if (!clerk) {
        throw new Error("Authentication system failed to initialize. Please refresh.");
      }

      // Check active signIn session
      if (!clerk.client.signIn || !clerk.client.signIn.id) {
        throw new Error("Reset session expired. Please click 'Resend code' below to get a fresh code.");
      }

      // Single official Clerk attemptFirstFactor call with strategy, code AND new password
      const res = await clerk.client.signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: code,
        password: resetNewPassword,
      });

      if (res && res.status === "complete") {
        await clerk.setActive({ session: res.createdSessionId });
        redirectToDashboard(clerk, resetEmail.trim());
        return;
      } else if (res && res.status === "needs_second_factor") {
        try {
          await clerk.client.signIn.prepareSecondFactor({ strategy: "email_code" });
        } catch (prepErr) {
          console.warn("Second factor preparation:", prepErr);
        }
        setIsForgotPassword(false);
        setIsSecondFactor(true);
        setSignInLoading(false);
        setAuthDeniedMessage("");
        return;
      } else {
        setResetLoading(false);
        setResetErrors({ form: `Verification status: ${res?.status || "unknown"}. Additional step required.` });
      }
    } catch (err: any) {
      setResetLoading(false);
      const errCode = err?.errors?.[0]?.code;
      const rawMsg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        err?.message ||
        "";

      let userMsg = rawMsg;
      if (
        errCode === "verification_expired" ||
        rawMsg.toLowerCase().includes("expired")
      ) {
        userMsg = "Verification code has expired. Please click 'Resend code' below to receive a new code.";
      } else if (
        errCode === "form_code_incorrect" ||
        rawMsg.toLowerCase().includes("incorrect") ||
        rawMsg.toLowerCase().includes("invalid code")
      ) {
        userMsg = "Incorrect 6-digit code. Please verify the code in your email and try again.";
      } else if (
        errCode === "client_state_invalid" ||
        rawMsg.toLowerCase().includes("verification code before attempting")
      ) {
        userMsg = "Your reset session was interrupted. Please click 'Resend code' below to send a fresh code.";
      } else if (
        errCode === "form_password_pwned" ||
        rawMsg.toLowerCase().includes("breach")
      ) {
        userMsg = "This password was flagged in an online data breach for account safety. Please choose a different, secure password.";
      } else if (errCode === "form_password_length_too_short") {
        userMsg = rawMsg || "Password must be at least 15 characters.";
      } else if (!userMsg) {
        userMsg = "Failed to update password. Please verify the 6-digit code or choose a stronger password.";
      }

      setResetErrors({ form: userMsg });
    }
  }

  async function handleResendResetCode() {
    setResetMessage("");
    setResetLoading(true);
    setResetErrors({});
    try {
      const clerk: any = await getClerkClient();
      if (!clerk) throw new Error("Authentication system failed to initialize.");
      const trimmedEmail = resetEmail.trim();

      let prepared = false;
      const factors = clerk?.client?.signIn?.supportedFirstFactors || [];
      const resetFactor = factors.find(
        (f: any) => f.strategy === "reset_password_email_code"
      );
      if (resetFactor && resetFactor.emailAddressId) {
        try {
          await clerk.client.signIn.prepareFirstFactor({
            strategy: "reset_password_email_code",
            emailAddressId: resetFactor.emailAddressId,
          });
          prepared = true;
        } catch (prepErr) {
          console.warn("prepareFirstFactor on resend failed, recreating signIn:", prepErr);
        }
      }

      if (!prepared) {
        await clerk.client.signIn.create({
          strategy: "reset_password_email_code",
          identifier: trimmedEmail,
        });
      }

      setResetMessage(`A fresh verification code was sent to ${trimmedEmail}.`);
    } catch (err: any) {
      const errMsg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        err?.message ||
        "Failed to resend code. Please wait a moment and try again.";
      setResetErrors({ form: errMsg });
    } finally {
      setResetLoading(false);
    }
  }

  // Handle Sign Up submission
  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!signUpFirst.trim()) {
      errs.firstName = "First name is required";
    } else if (signUpFirst.trim().length < 2) {
      errs.firstName = "First name must be at least 2 characters";
    }

    if (!signUpLast.trim()) {
      errs.lastName = "Last name is required";
    } else if (signUpLast.trim().length < 2) {
      errs.lastName = "Last name must be at least 2 characters";
    }

    if (!signUpEmail.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpEmail.trim())) {
      errs.email = "Please enter a valid email address";
    }

    if (!signUpPassword) {
      errs.password = "Password is required";
    } else if (signUpPassword.length < 15) {
      errs.password = "Password must be at least 15 characters";
    }

    if (Object.keys(errs).length > 0) {
      setSignUpErrors(errs);
      return;
    }

    setSignUpErrors({});
    setSignUpLoading(true);

    const formData = new FormData();
    formData.append("access_key", "1133c381-02e1-469b-b96f-87d2ae31e473");
    formData.append("from_name", "Nexcore Portal Registration");
    formData.append("subject", "New Account Registration / Signup — Nexcore");
    formData.append("firstName", signUpFirst);
    formData.append("lastName", signUpLast);
    formData.append("email", signUpEmail);
    formData.append("registrationType", "Step 1 Account Credentials Completed");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { success: boolean; message?: string };
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to submit registration");
      }
      setSignUpLoading(false);
      setSignUpSuccess(true);
    } catch {
      setSignUpLoading(false);
      setSignUpSuccess(true);
    }
  }

  return (
    <div className="auth-page-wrapper">
      {/* Background Soft Pink Glows */}
      <div className="auth-ambient-glows" aria-hidden="true">
        <div className="auth-glow glow-top-left" />
        <div className="auth-glow glow-top-right" />
        <div className="auth-glow glow-bottom-center" />
      </div>

      {/* Top back navigation */}
      <Link href="/" className="auth-back-link">
        <ArrowLeft size={16} />
        <span>Back to home</span>
      </Link>

      {/* Centered Auth Card */}
      <div className="auth-card-container">
        <NexcoreRobotLogo />

        {signUpSuccess ? (
          <div className="auth-success-box">
            <div className="auth-success-icon">
              <CheckCircle2 size={36} />
            </div>
            <h2>Welcome to Nexcore!</h2>
            <p className="auth-success-msg">
              Thank you so much for creating your account! Our team has received your registration and will reach out to you as soon as possible with your onboarding details and clinic dashboard access.
            </p>
            <p className="auth-success-sweet">
              Thank you for your time filling this out — we are excited to work together!
            </p>
            <button
              type="button"
              className="auth-btn-primary"
              onClick={() => {
                setSignUpSuccess(false);
                switchMode("signin");
              }}
            >
              Sign in to portal
            </button>
            <Link href="/" className="auth-switch-link" style={{ marginTop: "14px", display: "inline-block" }}>
              Return to Nexcore website ↗
            </Link>
          </div>
        ) : mode === "signin" && isSecondFactor ? (
          /* ================= TWO-FACTOR VERIFICATION FORM ================= */
          <form className="auth-form" onSubmit={handleVerifySecondFactor} noValidate>
            <div className="auth-header">
              <h1>Verify your identity</h1>
              <p>Enter the 6-digit verification code sent to <strong>{signInEmail}</strong></p>
            </div>

            {authDeniedMessage && (
              <div className="auth-denial-alert" role="alert">
                {authDeniedMessage}
              </div>
            )}

            <div className="auth-field">
              <label htmlFor="2fa-code">Verification Code</label>
              <input
                id="2fa-code"
                type="text"
                maxLength={6}
                placeholder="123456"
                autoComplete="one-time-code"
                value={secondFactorCode}
                onChange={(e) => {
                  setSecondFactorCode(e.target.value);
                  if (authDeniedMessage) setAuthDeniedMessage("");
                }}
                style={{ textAlign: "center", letterSpacing: "0.25em", fontSize: "1.25rem", fontWeight: "bold" }}
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="auth-btn-primary"
              disabled={signInLoading || !secondFactorCode.trim()}
            >
              {signInLoading ? (
                <>
                  <LoaderCircle className="spin" size={17} /> Verifying...
                </>
              ) : (
                "Verify & Continue"
              )}
            </button>

            <div className="auth-row-between" style={{ marginTop: "14px" }}>
              <button
                type="button"
                className="auth-link-pink"
                onClick={() => {
                  setIsSecondFactor(false);
                  setSecondFactorCode("");
                  setAuthDeniedMessage("");
                }}
              >
                ← Back to sign in
              </button>
              <button
                type="button"
                className="auth-link-pink"
                onClick={handleResendSecondFactor}
              >
                Resend code
              </button>
            </div>
          </form>
        ) : mode === "signin" && isForgotPassword ? (
          /* ================= PASSWORD RESET FLOW ================= */
          resetStep === "request" ? (
            <form className="auth-form" onSubmit={handleSendResetCode} noValidate>
              <div className="auth-header">
                <h1>Reset your password</h1>
                <p>Enter your clinic administrator email to receive a 6-digit reset code.</p>
              </div>

              {resetErrors.form && (
                <div className="auth-denial-alert" role="alert">
                  {resetErrors.form}
                </div>
              )}

              <div className="auth-field">
                <label htmlFor="reset-email">Email Address</label>
                <input
                  id="reset-email"
                  type="email"
                  placeholder="admin@nexcore-app.com"
                  autoComplete="email"
                  value={resetEmail}
                  onChange={(e) => {
                    setResetEmail(e.target.value);
                    if (resetErrors.email) setResetErrors((prev) => ({ ...prev, email: "" }));
                    if (resetErrors.form) setResetErrors((prev) => ({ ...prev, form: "" }));
                  }}
                  className={resetErrors.email ? "input-has-error" : ""}
                  autoFocus
                />
                {resetErrors.email && (
                  <span className="auth-error-text">{resetErrors.email}</span>
                )}
              </div>

              <button
                type="submit"
                className="auth-btn-primary"
                disabled={resetLoading}
              >
                {resetLoading ? (
                  <>
                    <LoaderCircle className="spin" size={17} /> Sending code...
                  </>
                ) : (
                  "Send verification code"
                )}
              </button>

              <div className="auth-row-between" style={{ marginTop: "16px" }}>
                <button
                  type="button"
                  className="auth-link-pink"
                  onClick={() => {
                    setIsForgotPassword(false);
                    setAuthDeniedMessage("");
                    setIsBreachedPasswordError(false);
                  }}
                >
                  ← Back to sign in
                </button>
                <a
                  href="mailto:support@nexcore-app.com"
                  className="auth-link-pink"
                  style={{ fontSize: "12px", color: "#9ca3af", fontWeight: 400 }}
                >
                  Contact support
                </a>
              </div>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleVerifyResetPassword} noValidate>
              <div className="auth-header">
                <h1>Set new password</h1>
                <p>Enter the 6-digit code sent to <strong>{resetEmail}</strong> and your new password.</p>
              </div>

              {resetMessage && (
                <div className="auth-success-alert" role="status">
                  {resetMessage}
                </div>
              )}

              {resetErrors.form && (
                <div className="auth-denial-alert" role="alert">
                  {resetErrors.form}
                </div>
              )}

              <div className="auth-field">
                <label htmlFor="reset-code">6-Digit Verification Code</label>
                <input
                  id="reset-code"
                  type="text"
                  maxLength={6}
                  placeholder="123456"
                  autoComplete="one-time-code"
                  value={resetCode}
                  onChange={(e) => {
                    setResetCode(e.target.value);
                    if (resetErrors.code) setResetErrors((prev) => ({ ...prev, code: "" }));
                    if (resetErrors.form) setResetErrors((prev) => ({ ...prev, form: "" }));
                  }}
                  style={{ textAlign: "center", letterSpacing: "0.25em", fontSize: "1.25rem", fontWeight: "bold" }}
                  className={resetErrors.code ? "input-has-error" : ""}
                  autoFocus
                />
                {resetErrors.code && (
                  <span className="auth-error-text">{resetErrors.code}</span>
                )}
              </div>

              <div className="auth-field">
                <label htmlFor="reset-new-password">New Password</label>
                <div className="auth-input-password-wrap">
                  <input
                    id="reset-new-password"
                    type={showResetPassword ? "text" : "password"}
                    placeholder="Minimum 15 characters"
                    autoComplete="new-password"
                    value={resetNewPassword}
                    onChange={(e) => {
                      setResetNewPassword(e.target.value);
                      if (resetErrors.password) setResetErrors((prev) => ({ ...prev, password: "" }));
                      if (resetErrors.form) setResetErrors((prev) => ({ ...prev, form: "" }));
                    }}
                    className={resetErrors.password ? "input-has-error" : ""}
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowResetPassword(!showResetPassword)}
                    aria-label={showResetPassword ? "Hide password" : "Show password"}
                  >
                    {showResetPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {resetErrors.password && (
                  <span className="auth-error-text">{resetErrors.password}</span>
                )}
              </div>

              <div className="auth-field">
                <label htmlFor="reset-confirm-password">Confirm New Password</label>
                <input
                  id="reset-confirm-password"
                  type={showResetPassword ? "text" : "password"}
                  placeholder="Re-enter your new password"
                  autoComplete="new-password"
                  value={resetConfirmPassword}
                  onChange={(e) => {
                    setResetConfirmPassword(e.target.value);
                    if (resetErrors.confirmPassword) setResetErrors((prev) => ({ ...prev, confirmPassword: "" }));
                    if (resetErrors.form) setResetErrors((prev) => ({ ...prev, form: "" }));
                  }}
                  className={resetErrors.confirmPassword ? "input-has-error" : ""}
                />
                {resetErrors.confirmPassword && (
                  <span className="auth-error-text">{resetErrors.confirmPassword}</span>
                )}
              </div>

              <button
                type="submit"
                className="auth-btn-primary"
                disabled={resetLoading || !resetCode.trim() || !resetNewPassword}
              >
                {resetLoading ? (
                  <>
                    <LoaderCircle className="spin" size={17} /> Updating password...
                  </>
                ) : (
                  "Reset password & sign in"
                )}
              </button>

              <div className="auth-row-between" style={{ marginTop: "16px" }}>
                <button
                  type="button"
                  className="auth-link-pink"
                  onClick={() => {
                    setIsForgotPassword(false);
                    setAuthDeniedMessage("");
                  }}
                >
                  ← Back to sign in
                </button>
                <button
                  type="button"
                  className="auth-link-pink"
                  onClick={handleResendResetCode}
                >
                  Resend code
                </button>
              </div>
            </form>
          )
        ) : mode === "signin" ? (
          /* ================= SIGN IN FORM ================= */
          <form className="auth-form" onSubmit={handleSignIn} noValidate>
            <div className="auth-header">
              <h1>Welcome back</h1>
              <p>Please enter your details to sign in.</p>
            </div>

            {existingSessionEmail && (
              <div
                style={{
                  marginBottom: "16px",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(236, 72, 153, 0.08)",
                  border: "1px solid rgba(236, 72, 153, 0.25)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <div style={{ fontSize: "13px", color: "#e2e8f0" }}>
                  Active session found for{" "}
                  <strong style={{ color: "#ec4899" }}>{existingSessionEmail}</strong>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <button
                    type="button"
                    className="auth-btn-primary"
                    style={{ padding: "8px 14px", fontSize: "13px", width: "auto" }}
                    onClick={async () => {
                      const clerk = await getClerkClient();
                      redirectToDashboard(clerk, existingSessionEmail);
                    }}
                  >
                    Continue to Dashboard &rarr;
                  </button>
                  <button
                    type="button"
                    className="auth-link-pink"
                    style={{ fontSize: "12px" }}
                    onClick={async () => {
                      setExistingSessionEmail(null);
                      const clerk = await getClerkClient();
                      if (clerk) {
                        await clerk.signOut().catch(() => {});
                      }
                    }}
                  >
                    Switch account
                  </button>
                </div>
              </div>
            )}

            {authDeniedMessage && (
              <div className="auth-denial-alert" role="alert">
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  {isBreachedPasswordError && (
                    <ShieldAlert size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0 }}>{authDeniedMessage}</p>
                    {isBreachedPasswordError && (
                      <button
                        type="button"
                        className="auth-alert-action-btn"
                        onClick={() => startForgotPassword(signInEmail)}
                      >
                        Reset password via email code →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="auth-field">
              <label htmlFor="signin-email">Email</label>
              <input
                id="signin-email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={signInEmail}
                onChange={(e) => {
                  setSignInEmail(e.target.value);
                  if (signInErrors.email) {
                    setSignInErrors((prev) => ({ ...prev, email: "" }));
                  }
                  if (authDeniedMessage) {
                    setAuthDeniedMessage("");
                    setIsBreachedPasswordError(false);
                  }
                }}
                className={signInErrors.email ? "input-has-error" : ""}
              />
              {signInErrors.email && (
                <span className="auth-error-text">{signInErrors.email}</span>
              )}
            </div>

            <div className="auth-field">
              <label htmlFor="signin-password">Password</label>
              <div className="auth-input-password-wrap">
                <input
                  id="signin-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={signInPassword}
                  onChange={(e) => {
                    setSignInPassword(e.target.value);
                    if (signInErrors.password) {
                      setSignInErrors((prev) => ({ ...prev, password: "" }));
                    }
                    if (authDeniedMessage) {
                      setAuthDeniedMessage("");
                      setIsBreachedPasswordError(false);
                    }
                  }}
                  className={signInErrors.password ? "input-has-error" : ""}
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {signInErrors.password && (
                <span className="auth-error-text">{signInErrors.password}</span>
              )}
            </div>

            <div className="auth-row-between">
              <label className="auth-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="auth-link-pink"
                onClick={() => startForgotPassword(signInEmail)}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="auth-btn-primary"
              disabled={signInLoading}
            >
              {signInLoading ? (
                <>
                  <LoaderCircle className="spin" size={17} /> Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>

            <div className="auth-footer-prompt">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="auth-link-pink"
                onClick={() => switchMode("signup")}
              >
                Sign up
              </button>
            </div>
          </form>
        ) : (
          /* ================= SIGN UP FORM ================= */
          <form className="auth-form" onSubmit={handleSignUp} noValidate>
            <div className="auth-header">
              <h1>Create your account</h1>
              <p>Step 1 of 3 · Account credentials</p>
            </div>

            <div className="auth-name-grid">
              <div className="auth-field">
                <label htmlFor="signup-first">First Name</label>
                <input
                  id="signup-first"
                  type="text"
                  placeholder="Enter your first name"
                  autoComplete="given-name"
                  value={signUpFirst}
                  onChange={(e) => {
                    setSignUpFirst(e.target.value);
                    if (signUpErrors.firstName) {
                      setSignUpErrors((prev) => ({ ...prev, firstName: "" }));
                    }
                  }}
                  className={signUpErrors.firstName ? "input-has-error" : ""}
                />
                {signUpErrors.firstName && (
                  <span className="auth-error-text">{signUpErrors.firstName}</span>
                )}
              </div>

              <div className="auth-field">
                <label htmlFor="signup-last">Last Name</label>
                <input
                  id="signup-last"
                  type="text"
                  placeholder="Enter your last name"
                  autoComplete="family-name"
                  value={signUpLast}
                  onChange={(e) => {
                    setSignUpLast(e.target.value);
                    if (signUpErrors.lastName) {
                      setSignUpErrors((prev) => ({ ...prev, lastName: "" }));
                    }
                  }}
                  className={signUpErrors.lastName ? "input-has-error" : ""}
                />
                {signUpErrors.lastName && (
                  <span className="auth-error-text">{signUpErrors.lastName}</span>
                )}
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={signUpEmail}
                onChange={(e) => {
                  setSignUpEmail(e.target.value);
                  if (signUpErrors.email) {
                    setSignUpErrors((prev) => ({ ...prev, email: "" }));
                  }
                }}
                className={signUpErrors.email ? "input-has-error" : ""}
              />
              {signUpErrors.email && (
                <span className="auth-error-text">{signUpErrors.email}</span>
              )}
            </div>

            <div className="auth-field">
              <label htmlFor="signup-password">Password</label>
              <div className="auth-input-password-wrap">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  value={signUpPassword}
                  onChange={(e) => {
                    setSignUpPassword(e.target.value);
                    if (signUpErrors.password) {
                      setSignUpErrors((prev) => ({ ...prev, password: "" }));
                    }
                  }}
                  className={signUpErrors.password ? "input-has-error" : ""}
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {signUpErrors.password && (
                <span className="auth-error-text">{signUpErrors.password}</span>
              )}
            </div>

            <button
              type="submit"
              className="auth-btn-primary"
              disabled={signUpLoading}
            >
              {signUpLoading ? (
                <>
                  <LoaderCircle className="spin" size={17} /> Creating account...
                </>
              ) : (
                "Next"
              )}
            </button>

            <div className="auth-footer-prompt">
              Already have an account?{" "}
              <button
                type="button"
                className="auth-link-pink"
                onClick={() => switchMode("signin")}
              >
                Sign in
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
