"use server"
import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma'; // Assuming you have prisma set up correctly

export async function POST(req) {
    try {
        const { rating, comment, product_id, name, email } = await req.json();

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
