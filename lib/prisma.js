// lib/prisma.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;


// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient({
//     log: ['query', 'info', 'warn', 'error'],
//     datasources: {
//         db: {
//             url: process.env.DATABASE_URL,  // Your database URL
//         },
//     },
// })
// export default prisma;
