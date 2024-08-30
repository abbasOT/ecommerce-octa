
"use server";

import { NextResponse } from 'next/server';
import prisma from "../../../../../lib/prisma"; // Adjust the path based on your project setup

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const customerId = searchParams.get('customer_id');

        if (!customerId) {
            return NextResponse.json({ error: 'Missing customer_id parameter' }, { status: 400 });
        }

        const wishList = await prisma.wishlist.findMany({
            where: {
                customer_id: customerId // Filter reviews by product_id
            },
            orderBy: {
                createdAt: 'desc' // Order reviews by createdAt descending
            }
        });

        return NextResponse.json({ wishList }, { status: 200 });
    } catch (error) {
        console.error('Error fetching wishList:', error);
        return NextResponse.json({ error: 'Failed to fetch wishList' }, { status: 500 });
    }
}
