// app/api/email_verification/create/route.js
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma'; // Adjust the path to your Prisma client

export async function POST(req) {

    function generateOTP(length = 6) {
        let otp = '';
        for (let i = 0; i < length; i++) {
            otp += Math.floor(Math.random() * 10); // Generate a random digit
        }
        return otp;
    }


    try {
        // Read the raw text data from the request
        const text = await req.text();
        const otp = generateOTP();
        // Parse the text data manually
        const { email } = JSON.parse(text);

        if (!email || !otp) {
            return NextResponse.json({ message: 'Email and OTP are required' }, { status: 400 });
        }

        // Check if the email exists in the customer table
        const existingCustomer = await prisma.customer.findFirst({
            where: { email },
        });

        if (existingCustomer) {
            return NextResponse.json({ error: 'Email Already Exists' }, { status: 404 });
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
            from: process.env.EMAIL_USER, // Your email address for the 'from' field
            to: email, // Recipient's email address
            subject: 'Email Verification OTP Code Circuithub.pk', // Email subject
            text: `Your OTP for email verification is: ${otp}`, // Plain text body
            html: `<p>Your OTP for email verification is: <strong>${otp}</strong></p>`, // HTML body
        });


        // Store the OTP and email in the database
        await prisma.otpverification.create({
            data: {
                otp,
                email,
            },
        });


        return NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error.message);
        return NextResponse.json({ message: 'Error sending email', error: error.message }, { status: 500 });
    }
}
