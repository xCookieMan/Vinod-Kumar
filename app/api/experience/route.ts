import dbConnect from '@/lib/mongodb';
import Experience from '@/models/Experience';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();
  const experiences = await Experience.find({}).sort({ order: 1 }).lean();
  return NextResponse.json(experiences);
}
