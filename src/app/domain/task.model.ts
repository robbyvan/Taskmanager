export interface Task {
  desc: string;
  completed: boolean;
  priority: number;
  createDate: Date;
  participantsIds: string[];
  taskListId: string;
  id?: string;
  dueDate?: Date;
  reminder?: Date;
  remark?: string;
  ownerId?: string;
}