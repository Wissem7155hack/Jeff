import { NextResponse } from "next/server";
import { db } from "@/db";
import { inquiries } from "@/db/schema";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;

    if (clean(body.website, 200)) {
      return NextResponse.json({ ok: true });
    }

    const firstName = clean(body.firstName, 100);
    const lastName = clean(body.lastName, 100);
    const email = clean(body.email, 255).toLowerCase();
    const phone = clean(body.phone, 40);
    const practiceName = clean(body.practiceName, 180);
    const practiceType = clean(body.practiceType, 100);
    const message = clean(body.message, 3000);
    const source = clean(body.source, 40) || "demo";

    if (firstName.length < 2 || lastName.length < 2 || !emailPattern.test(email)) {
      return NextResponse.json({ ok: false, message: "Please provide your name and a valid work email." }, { status: 400 });
    }

    if (source === "demo" && practiceName.length < 2) {
      return NextResponse.json({ ok: false, message: "Please add your practice name." }, { status: 400 });
    }

    await db.insert(inquiries).values({
      firstName,
      lastName,
      email,
      phone: phone || null,
      practiceName: practiceName || null,
      practiceType: practiceType || null,
      message: message || null,
      source,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Inquiry submission failed", error);
    return NextResponse.json({ ok: false, message: "We could not submit your request. Please try again." }, { status: 500 });
  }
}
