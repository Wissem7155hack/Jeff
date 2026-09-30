"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { FormEvent, useState } from "react";

export function LeadForm({ source = "demo" }: { source?: "demo" | "contact" }) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    practiceName: "",
    website: "",
    practiceType: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function validate() {
    const errs: Record<string, string> = {};

    if (!values.firstName.trim()) {
      errs.firstName = "First name is required";
    } else if (values.firstName.trim().length < 2) {
      errs.firstName = "First name must be at least 2 characters";
    }

    if (!values.lastName.trim()) {
      errs.lastName = "Last name is required";
    } else if (values.lastName.trim().length < 2) {
      errs.lastName = "Last name must be at least 2 characters";
    }

    if (!values.email.trim()) {
      errs.email = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errs.email = "Please enter a valid email address";
    }

    if (!values.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (values.phone.replace(/\D/g, "").length < 7) {
      errs.phone = "Please enter a valid phone number (at least 7 digits)";
    }

    if (!values.practiceName.trim()) {
      errs.practiceName = "Practice name is required";
    }

    if (!values.website.trim()) {
      errs.website = "Website is required";
    } else if (!/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/i.test(values.website.trim())) {
      errs.website = "Please enter a valid website address (e.g. yourpractice.com)";
    }

    if (!values.practiceType.trim()) {
      errs.practiceType = "Please select your practice type";
    }

    if (!values.message.trim()) {
      errs.message = source === "contact" ? "Please tell us how we can help" : "Please tell us what you'd like to improve";
    } else if (values.message.trim().length < 5) {
      errs.message = "Message must be at least 5 characters";
    }

    return errs;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formErrors = validate();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      // Focus first error field
      const firstField = Object.keys(formErrors)[0];
      const el = form.elements.namedItem(firstField) as HTMLElement | null;
      if (el && typeof el.focus === "function") {
        el.focus();
      }
      return;
    }

    setState("loading");
    setMessage("");

    const formData = new FormData();
    formData.append("access_key", "1133c381-02e1-469b-b96f-87d2ae31e473");
    formData.append("from_name", "Nexcore Website");
    formData.append(
      "subject",
      source === "contact" ? "New Contact Message — Nexcore" : "New Demo Request — Nexcore"
    );
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("practiceName", values.practiceName);
    formData.append("website", values.website);
    formData.append("practiceType", values.practiceType);
    formData.append("message", values.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { success: boolean; message?: string };
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Please check the form and try again.");
      }
      setValues({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        practiceName: "",
        website: "",
        practiceType: "",
        message: "",
      });
      setErrors({});
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
        <p>We&apos;ve received your details and our team will follow up using the email address you provided as soon as possible.</p>
        <button
          type="button"
          className="text-link"
          onClick={() => {
            setState("idle");
            setErrors({});
          }}
        >
          Send another message <span>↗</span>
        </button>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={submit} noValidate>
      <input type="hidden" name="access_key" value="1133c381-02e1-469b-b96f-87d2ae31e473" />
      <input type="hidden" name="from_name" value="Nexcore Website" />
      
      <div className="form-row">
        <label>
          <span>First name *</span>
          <input
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            placeholder="Your first name"
            value={values.firstName}
            onChange={handleChange}
            className={errors.firstName ? "input-error" : ""}
          />
          {errors.firstName && <span className="field-error">{errors.firstName}</span>}
        </label>
        <label>
          <span>Last name *</span>
          <input
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            placeholder="Your last name"
            value={values.lastName}
            onChange={handleChange}
            className={errors.lastName ? "input-error" : ""}
          />
          {errors.lastName && <span className="field-error">{errors.lastName}</span>}
        </label>
      </div>

      <label>
        <span>Work email *</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@yourpractice.com"
          value={values.email}
          onChange={handleChange}
          className={errors.email ? "input-error" : ""}
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </label>

      <div className="form-row">
        <label>
          <span>Phone number *</span>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="(555) 000-0000"
            value={values.phone}
            onChange={handleChange}
            className={errors.phone ? "input-error" : ""}
          />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </label>
        <label>
          <span>Practice name *</span>
          <input
            name="practiceName"
            type="text"
            required
            autoComplete="organization"
            placeholder="Your practice"
            value={values.practiceName}
            onChange={handleChange}
            className={errors.practiceName ? "input-error" : ""}
          />
          {errors.practiceName && <span className="field-error">{errors.practiceName}</span>}
        </label>
      </div>

      <label>
        <span>Website *</span>
        <input
          name="website"
          type="text"
          required
          autoComplete="url"
          placeholder="https://yourpractice.com"
          value={values.website}
          onChange={handleChange}
          className={errors.website ? "input-error" : ""}
        />
        {errors.website && <span className="field-error">{errors.website}</span>}
      </label>

      <label>
        <span>Practice type *</span>
        <select
          name="practiceType"
          value={values.practiceType}
          onChange={handleChange}
          className={errors.practiceType ? "input-error" : ""}
        >
          <option value="" disabled>Select your practice type</option>
          <option value="Medical spa">Medical spa</option>
          <option value="Cosmetic dermatology">Cosmetic dermatology</option>
          <option value="Plastic surgery">Plastic surgery</option>
          <option value="Wellness practice">Wellness practice</option>
          <option value="Other">Other</option>
        </select>
        {errors.practiceType && <span className="field-error">{errors.practiceType}</span>}
      </label>

      <label>
        <span>{source === "contact" ? "How can we help? *" : "What would you most like to improve? *"}</span>
        <textarea
          name="message"
          rows={4}
          placeholder={source === "contact" ? "Tell us what you need help with..." : "Memberships, repeat visits, after-hours sales..."}
          value={values.message}
          onChange={handleChange}
          className={errors.message ? "input-error" : ""}
        />
        {errors.message && <span className="field-error">{errors.message}</span>}
      </label>

      {state === "error" && <p className="form-error" role="alert">{message}</p>}

      <button className="button button-pink form-submit" type="submit" disabled={state === "loading"}>
        {state === "loading" ? (
          <><LoaderCircle className="spin" size={17} /> Sending request</>
        ) : (
          <>{source === "contact" ? "Send message" : "Request my demo"} <ArrowRight size={17} /></>
        )}
      </button>

      <p className="form-disclaimer">
        By submitting, you agree that Nexcore may contact you about your request. See our <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </form>
  );
}
