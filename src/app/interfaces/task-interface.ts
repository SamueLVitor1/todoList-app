export interface TaskDTO {
  id: number;
  description: string;
  completed: boolean;
}

export type TaskCreateDTO = Omit<TaskDTO, 'id'>;
export type TaskUpdateDTO = Partial<Omit<TaskDTO, 'id'>>;
