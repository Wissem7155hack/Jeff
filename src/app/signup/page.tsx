import type { Metadata } from "next";
import { AuthCard } from "@/components/auth-card";

export const metadata: Metadata = {
  title: "Create your account — Nexcore Partner Portal",
  description: "Create your Nexcore account to launch your branded practice mobile app and dashboard.",
};

export default function SignUpPage() {
  return (
    <main id="main-content">
      <AuthCard initialMode="signup" />
    </main>
  );
}
