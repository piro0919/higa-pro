import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export type PostEmailBody = {
  content: string;
  email: string;
  name: string;
};

export type PostEmailData = Record<string, never>;

export async function POST(
  request: NextRequest
): Promise<NextResponse<PostEmailData>> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { content, email, name }: PostEmailBody = await request.json();

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

    await transporter.sendMail({
      replyTo: email,
      subject: `[HIGApro]${name}様から新しいメッセージ`,
      text: content,
      to: process.env.NODEMAILER_AUTH_USER,
    });

    return NextResponse.json<PostEmailData>({});
  } catch {
    return NextResponse.json({}, { status: 500 });
  }
}
