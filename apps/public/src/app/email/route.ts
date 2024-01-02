import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export type PostEmailBody = {
  email: string;
  name: string;
  subject: string;
  text: string;
};

export type PostEmailData = Record<string, never>;

export async function POST(
  request: NextRequest,
): Promise<NextResponse<PostEmailData>> {
  const { email, name, subject, text } =
    (await request.json()) as PostEmailBody;

  try {
    const transporter = nodemailer.createTransport({
      auth: {
        pass: process.env.NODEMAILER_AUTH_PASS,
        user: process.env.NODEMAILER_AUTH_USER,
      },
      port: 465,
      secure: true,
      service: "gmail",
    });

    await transporter.verify();

    await transporter.sendMail({
      replyTo: `"${name}" <${email}>`,
      subject: `【Higa Production 公式サイト】${subject}`,
      text,
      to: process.env.NODEMAILER_AUTH_USER,
    });

    return NextResponse.json<PostEmailData>({});
  } catch {
    return NextResponse.json({}, { status: 500 });
  }
}
