import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma'; // Adjust the path based on your project setup

export async function DELETE(req) {
    try {
        const { customerId, productId } = await req.json(); // Extract both customerId and productId

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
