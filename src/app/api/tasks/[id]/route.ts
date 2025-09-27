import { TaskModel } from '@/models/task';
import { connectDb } from '@/utils/database';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectDb();
    const { id } = await params;
    const task = await TaskModel.findById(id);

    if (!task) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Task fetched successfully', task },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching task', error);
    return NextResponse.json(
      { message: 'Failed to fetch task' },
      { status: 500 }
    );
  }
};

export const dynamic = 'force-dynamic';
