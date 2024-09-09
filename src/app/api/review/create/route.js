"use server";
import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma'; // Assuming you have prisma set up correctly

export async function POST(req) {
    try {
        // Parse the plain text body into JSON
        const textBody = await req.text();
        const body = JSON.parse(textBody);

        const { rating, comment, product_id, name, email } = body;

        // Check if all required fields are present
        if (!rating || !comment || !product_id || !name || !email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if a review with the same email already exists
        const existingReview = await prisma.review.findUnique({
            where: { email },
        });

        if (existingReview) {
            return NextResponse.json({ error: 'A review with this email already exists' }, { status: 409 });
        }

        // Create a new review
        const newReview = await prisma.review.create({
            data: {
                product_id,
                name,
                rating,
                comment,
                email,
                createdAt: new Date(),
            },
        });

        return NextResponse.json({ message: 'Review created successfully', review: newReview }, { status: 201 });
    } catch (error) {
        console.error('Error creating review:', error);
        return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
    }
}
