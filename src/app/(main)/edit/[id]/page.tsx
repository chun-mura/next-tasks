import EditTaskForm from '@/components/EditTaskForm/EditTaskForm';
import { TaskDocument } from '@/models/task';

interface Params {
  params: Promise<{ id: string }>;
}

const getTask = async (id: string): Promise<TaskDocument> => {
  const response = await fetch(`${process.env.API_URL}/tasks/${id}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch task');
  }
  const data = await response.json();
  return data.task;
};

const EditTaskPage = async ({ params }: Params) => {
  const { id } = await params;
  const task = await getTask(id);

  return (
    <div className="flex flex-col justify-center py-20">
      <h2 className="text-center text-2xl font-bold">Edit Task</h2>
      <EditTaskForm task={task} />
    </div>
  );
};

export default EditTaskPage;
