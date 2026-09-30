import type { Metadata } from "next";
import { AuthCard } from "@/components/auth-card";

export const metadata: Metadata = {
  title: "Sign in — Nexcore Partner Portal",
  description: "Sign in to access your Nexcore branded mobile app and owner growth dashboard.",
};

export default function LoginPage() {
  return (
    <main id="main-content">
      <AuthCard initialMode="signin" />
    </main>
  );
}
