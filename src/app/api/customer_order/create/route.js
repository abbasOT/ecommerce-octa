// pages/api/orders/index.js
import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma'; // Adjust the path as necessary

export async function POST(req) {
    try {
        const {
            customerId,
            totalAmount,
            paymentMethod,
            firstName,
            lastName,
            phone,
            email,
            streetAddress,
            country,
            city,
            state,
            zipCode,
            referenceNumber,
            paymentSecreenShotURL,
            items
        } = await req.json();

        // Validate the incoming data
        if (!customerId || !totalAmount || !paymentMethod || !firstName || !lastName || !phone || !email || !streetAddress || !country || !city || !state || !zipCode || !referenceNumber || !paymentSecreenShotURL || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Create the order
        const order = await prisma.customer_order.create({
            data: {
                customer_id: customerId,
                totalAmount,
                paymentMethod,
                firstName,
                lastName,
                phone,
                email,
                streetAddress,
                country,
                city,
                state,
                zipCode,
                referenceNumber,
                paymentSecreenShotURL,
                status: 'Pending',
                createdAt: new Date(),
                updatedAt: new Date(),
                items: {
                    create: items.map(item => ({
                        product_id: item.id,
                        quantity: item.quantity,
                        subTotal: Math.round((item.variants[0].prices[0].amount / 100) * item.quantity),
                    })),
                },
            },
        });

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
