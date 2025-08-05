import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../service/task.service';
import { TaskDTO } from '../interfaces/task-interface';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../components/create-task-dialog/create-task-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tasks: TaskDTO[] = [];
  constructor(
    private service: TaskService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.service.getTasks().subscribe({
      next: (data: TaskDTO[]) => {
        this.tasks = data;
        console.log(this.tasks);
      },
      error: (error: any) => {
        this.toastr.error('Ocorreu um erro ao buscar as tarefas!');
      },
    });
  }

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((isSucess) => {
      if(isSucess){ 
        this.getTasks()
      }
    });
  }

  logout() {
    throw new Error('Method not implemented.');
  }
}
