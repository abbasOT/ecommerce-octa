// app/api/email_verification/delete/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma'; // Adjust the path to your Prisma client

export async function DELETE(req) {
    try {
        // Read the raw text data from the request
        const text = await req.text();
        const { email } = JSON.parse(text);

        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }

        // Delete the OTP record associated with the provided email
        const deletedRecord = await prisma.otpverification.deleteMany({
            where: { email },
        });

        if (deletedRecord.count === 0) {
            return NextResponse.json({ message: 'No OTP record found for this email' }, { status: 404 });
        }

        return NextResponse.json({ message: 'OTP record deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting OTP:', error.message);
        return NextResponse.json({ message: 'Error deleting OTP', error: error.message }, { status: 500 });
    }
}
