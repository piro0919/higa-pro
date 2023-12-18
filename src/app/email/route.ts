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
  const { content, email, name } = (await request.json()) as PostEmailBody;

  try {
    const transporter = nodemailer.createTransport({
      auth: {
        pass: process.env.NODEMAILER_AUTH_PASS,
        user: process.env.NODEMAILER_AUTH_USER,
      },
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
    });

    await transporter.verify();

    await transporter.sendMail({
      replyTo: email,
      subject: `[Higa Production]${name}様から新しいメッセージ`,
      text: content,
      to: process.env.NODEMAILER_AUTH_USER,
    });

    return NextResponse.json<PostEmailData>({});
  } catch {
    return NextResponse.json({}, { status: 500 });
  }
}
