import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleHelp, Mail, MessageSquareText, MonitorCheck } from "lucide-react";
import { LeadForm } from "@/components/lead-form";

export const metadata: Metadata = { title: "Contact", description: "Contact Nexcore for product questions, practice app support, partnerships, or a tailored product demo.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return <main id="main-content"><section className="contact-page section-dark"><div className="contact-orb" /><div className="section-container contact-grid"><div className="contact-copy"><span className="eyebrow eyebrow-light">Contact Nexcore</span><h1>Let’s start with what your practice needs.</h1><p>Tell us where you are in your journey and we’ll route your message to the right place.</p><div className="contact-options"><a href="mailto:contact@nexcore-app.com"><span><Mail size={20} /></span><div><small>General enquiries</small><strong>contact@nexcore-app.com</strong></div><ArrowRight size={17} /></a><Link href="/book-demo"><span><MonitorCheck size={20} /></span><div><small>Explore the platform</small><strong>Book a tailored demo</strong></div><ArrowRight size={17} /></Link><a href="https://login.nexcore-app.com/"><span><CircleHelp size={20} /></span><div><small>Existing client</small><strong>Access your Nexcore account</strong></div><ArrowRight size={17} /></a></div><div className="contact-note"><MessageSquareText size={18} /><p>For privacy questions, account requests, or data enquiries, include enough detail for us to identify the relevant account.</p></div></div><div className="form-card"><div className="form-card-heading"><span>Send a message</span><h2>How can we help?</h2><p>Complete the form and the Nexcore team will follow up by email.</p></div><LeadForm source="contact" /></div></div></section></main>;
}
