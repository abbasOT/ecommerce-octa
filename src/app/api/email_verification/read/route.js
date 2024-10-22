// app/api/email_verification/read/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma'; // Adjust the path to your Prisma client

export async function POST(req) {
    try {
        // Read the raw text data from the request
        const text = await req.text();
        const { email, otp } = JSON.parse(text); // Expecting OTP from the frontend as well

        if (!email || !otp) {
            return NextResponse.json({ message: 'Email and OTP are required' }, { status: 400 });
        }

        // Find the OTP associated with the provided email
        const otpRecord = await prisma.otpverification.findFirst({
            where: { email },
        });

        // Check if the OTP exists
        if (!otpRecord) {
            return NextResponse.json({ message: 'No OTP found for this email' }, { status: 404 });
        }

        // Check if the OTP matches
        if (otpRecord.otp !== otp) {
            return NextResponse.json({ message: 'Invalid OTP provided' }, { status: 403 });
        }

        // Check if the OTP has expired (greater than 60 seconds)
        const createdAt = otpRecord.createdAt;
        const currentTime = new Date();
        const timeDifference = (currentTime - createdAt) / 1000; // Convert milliseconds to seconds

        if (timeDifference > 60) {
            return NextResponse.json({ message: 'OTP has expired' }, { status: 410 }); // 410 Gone
        }

        return NextResponse.json({ message: 'OTP verified successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error retrieving OTP:', error.message);
        return NextResponse.json({ message: 'Error retrieving OTP', error: error.message }, { status: 500 });
    }
}
