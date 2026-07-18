"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { FormEvent, useState } from "react";

export function LeadForm({ source = "demo" }: { source?: "demo" | "contact" }) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("subject", source === "contact" ? "New Contact Message — Nexcore" : "New Demo Request — Nexcore");
    formData.append("from_name", "Nexcore Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json() as { success: boolean; message?: string };
      if (!response.ok || !result.success) throw new Error(result.message || "Please check the form and try again.");
      form.reset();
      setState("success");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="form-success" role="status">
        <span><CheckCircle2 size={28} /></span>
        <p className="eyebrow">Request received</p>
        <h2>{source === "contact" ? "Thanks for reaching out." : "Your Nexcore demo is one step closer."}</h2>
        <p>We’ve received your details and will follow up using the email address you provided.</p>
        <button type="button" className="text-link" onClick={() => setState("idle")}>Send another message <span>↗</span></button>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={submit} noValidate>
      <input type="hidden" name="access_key" value="1133c381-02e1-469b-b96f-87d2ae31e473" />
      <input type="hidden" name="from_name" value="Nexcore Website" />
      <div className="form-row">
        <label><span>First name *</span><input name="firstName" type="text" required autoComplete="given-name" placeholder="Your first name" minLength={2} /></label>
        <label><span>Last name *</span><input name="lastName" type="text" required autoComplete="family-name" placeholder="Your last name" minLength={2} /></label>
      </div>
      <label><span>Work email *</span><input name="email" type="email" required autoComplete="email" placeholder="you@yourpractice.com" /></label>
      <div className="form-row">
        <label><span>Phone number</span><input name="phone" type="tel" autoComplete="tel" placeholder="(555) 000-0000" /></label>
        <label><span>Practice name {source === "demo" ? "*" : ""}</span><input name="practiceName" type="text" required={source === "demo"} autoComplete="organization" placeholder="Your practice" /></label>
      </div>
      <label><span>Website / Instagram *</span><input name="website" type="url" required autoComplete="url" placeholder="https://yourpractice.com or @instagram" /></label>
      <label>
        <span>Practice type</span>
        <select name="practiceType" defaultValue="">
          <option value="" disabled>Select your practice type</option>
          <option>Medical spa</option><option>Cosmetic dermatology</option><option>Plastic surgery</option><option>Wellness practice</option><option>Other</option>
        </select>
      </label>
      <label><span>{source === "contact" ? "How can we help?" : "What would you most like to improve?"}</span><textarea name="message" rows={4} placeholder={source === "contact" ? "Tell us what you need help with..." : "Memberships, repeat visits, after-hours sales..."} /></label>
      {state === "error" && <p className="form-error" role="alert">{message}</p>}
      <button className="button button-pink form-submit" type="submit" disabled={state === "loading"}>
        {state === "loading" ? <><LoaderCircle className="spin" size={17} /> Sending request</> : <>{source === "contact" ? "Send message" : "Request my demo"} <ArrowRight size={17} /></>}
      </button>
      <p className="form-disclaimer">By submitting, you agree that Nexcore may contact you about your request. See our <Link href="/privacy">Privacy Policy</Link>.</p>
    </form>
  );
}
