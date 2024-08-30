// pages/api/review/read.js
"use server";

import { NextResponse } from 'next/server';
import prisma from "../../../../../lib/prisma"; // Adjust the path based on your project setup

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get('product_id');

        if (!productId) {
            return NextResponse.json({ error: 'Missing product_id parameter' }, { status: 400 });
        }

        const reviews = await prisma.review.findMany({
            where: {
                product_id: productId // Filter reviews by product_id
            },
            orderBy: {
                createdAt: 'desc' // Order reviews by createdAt descending
            }
        });

        return NextResponse.json({ reviews }, { status: 200 });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}
