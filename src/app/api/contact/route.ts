import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_gMZt3JcT_JnUk8hKaxgnE977CBDGjQuzg");

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  try {
    await resend.emails.send({
      from: "Diky <onboarding@resend.dev>",
      to: ["drahmatillah69@gmail.com"],
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      replyTo: email,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
