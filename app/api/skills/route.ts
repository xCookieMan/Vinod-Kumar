import dbConnect from '@/lib/mongodb';
import Skill from '@/models/Skill';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();
  const skills = await Skill.find({}).lean();
  return NextResponse.json(skills);
}
