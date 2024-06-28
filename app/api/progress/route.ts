import { stat } from "fs";
import { db } from "../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formMatchPercent, reps, sets, rpe, userId } = body;

    const newProgress = await db.progress.create({
      data: {
        formMatchPercent,
        reps,
        sets,
        rpe: rpe || undefined,
        user: {
          connect: { id: userId },
        },
      },
    });

    await db.user.update({
      where: { id: userId },
      data: {
        progressIds: {
          push: newProgress.id,
        },
      },
    });

    return NextResponse.json({ progress: newProgress }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
