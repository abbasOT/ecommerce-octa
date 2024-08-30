// pages/api/review/read.js
"use server";

import { NextResponse } from 'next/server';
import prisma from "../../../../../lib/prisma"; // Adjust the path based on your project setup

export async function GET(req) {
    try {
        const categoryWithProducts = await prisma.product_category_product.findMany({
            include: {
                product: true,
                product_category: true
            }
        });

        return NextResponse.json({ categoryWithProducts }, { status: 200 });
    } catch (error) {
        console.error('Error fetching categoryWithProducts:', error);
        return NextResponse.json({ error: 'Failed to fetch categoryWithProducts' }, { status: 500 });
    }
}
