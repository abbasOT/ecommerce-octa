// app/api/sendemail/create/route.js
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // Read the raw text data from the request
        const text = await req.text();

        // Parse the text data manually
        const { email } = JSON.parse(text);

        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }
        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL_USER, // Use your email address for the 'from' field
            to: process.env.EMAIL_USER, // Recipient's email address
            replyTo: email, // Set the reply-to address to the sender's email
            subject: `Newsletter subscription Email from Circuithub.pk`, // Email subject
            text: `The user of this email ${email} wants Newsletter subscription`, // Email body
        });

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error.message);
        return NextResponse.json({ message: 'Error sending email', error: error.message }, { status: 500 });
    }
}
