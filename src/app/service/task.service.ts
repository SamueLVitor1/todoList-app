import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskCreateDTO, TaskDTO } from '../interfaces/task-interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private env: EnvironmentService, private http: HttpClient) {}

  getTasks(): Observable<TaskDTO[]> {
    return this.http.get<TaskDTO[]>(`${this.env.getHostURL()}/tasks`);
  }

  createTask(data: TaskCreateDTO): Observable<TaskDTO>{
    return this.http.post<TaskDTO>(`${this.env.getHostURL()}/tasks`, data);
  }
}
