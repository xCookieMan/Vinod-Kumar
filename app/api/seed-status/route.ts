import dbConnect from '@/lib/mongodb';
import Experience from '@/models/Experience';
import Skill from '@/models/Skill';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();
  const experienceCount = await Experience.countDocuments();
  const skillCount = await Skill.countDocuments();
  const sampleExperience = await Experience.findOne({}).lean();
  const sampleSkill = await Skill.findOne({}).lean();

  return NextResponse.json({ experienceCount, skillCount, sampleExperience, sampleSkill });
}
