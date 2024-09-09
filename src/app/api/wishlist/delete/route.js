"use server"
import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma'; // Adjust the path based on your project setup

export async function DELETE(req) {
    try {
        // Read raw text and parse JSON
        const text = await req.text();
        const { customerId, productId } = JSON.parse(text);

        const deletedWishlist = await prisma.wishlist.deleteMany({
            where: {
                customer_id: customerId,  // Match by customerId
                product_id: productId,    // Match by productId
            },
        });

        return NextResponse.json(deletedWishlist, { status: 200 });
    } catch (error) {
        console.error('Error deleting wishlist:', error);
        return NextResponse.json({ error: 'Failed to delete wishlist' }, { status: 500 });
    }
}
