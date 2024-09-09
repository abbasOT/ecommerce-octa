"use server";
import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma'; // Adjust the path based on your project setup

export async function POST(req) {
    try {
        // Read the raw text data from the request
        const text = await req.text();

        // Parse the text data manually
        const { customerId, productId } = JSON.parse(text);

        if (!customerId || !productId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if the wishlist item already exists
        const existingWishlist = await prisma.wishlist.findFirst({
            where: {
                customer_id: customerId,
                product_id: productId,
            },
        });

        if (existingWishlist) {
            return NextResponse.json({ message: 'Item already in wishlist' }, { status: 200 });
        }

        // Create new wishlist item if it doesn't exist
        const newWishlist = await prisma.wishlist.create({
            data: {
                customer_id: customerId,
                product_id: productId,
            },
        });

        return NextResponse.json(newWishlist, { status: 201 });
    } catch (error) {
        console.error('Error creating wishlist:', error);
        return NextResponse.json({ error: 'Failed to create wishlist' }, { status: 500 });
    }
}
