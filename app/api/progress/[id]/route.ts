import { db } from "../../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db.progress.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!user) {
      return NextResponse.json({ error: "Progress object not found" }, { status: 400 });
    }
    return NextResponse.json({ user: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await db.progress.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ message: 'Deleted Successfully' }, { status: 200 });
  }catch(error) {
    return NextResponse.json({ error: error }, { status: 400 }); 
  }
}
