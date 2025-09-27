import { TaskModel } from "@/models/task";
import { connectDb } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDb();
    const tasks = await TaskModel.find({ isCompleted: true });
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error('Error fetching completed tasks', error);
    return NextResponse.json({ message: 'Failed to fetch completed tasks' }, { status: 500 });
  }
};

export const dynamic = 'force-dynamic';
