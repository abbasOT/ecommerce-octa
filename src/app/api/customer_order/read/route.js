// src/app/api/orders/index.js
import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma'; // Adjust the path as necessary

export async function GET(req) {
    try {
        const orders = await prisma.customer_order.findMany({
            include: {
                items: true,
            },
        });

        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}
