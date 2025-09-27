import { TaskModel } from '@/models/task';
import { connectDb } from '@/utils/database';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const currentDate = new Date().toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/-/g, '/');

  try {
    await connectDb();
    const tasks = await TaskModel.find({
      dueDate: { $lt: currentDate },
      isCompleted: false,
    });
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error('Error fetching expired tasks', error);
    return NextResponse.json(
      { message: 'Failed to fetch expired tasks' },
      { status: 500 }
    );
  }
};
