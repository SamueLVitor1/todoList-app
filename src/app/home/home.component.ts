import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../service/task.service';
import { TaskDTO } from '../interfaces/task-interface';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../components/create-task-dialog/create-task-dialog.component';
import { TaskItemComponent } from '../components/task-item/task-item.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, TaskItemComponent, CommonModule],
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

  ngOnInit(): void {
    this.getTasks();
  }

  /** Contadores */
  get completedCount(): number {
    return this.tasks.filter(t => t.completed).length;
  }

  /** Render helper */
  trackById = (_: number, t: TaskDTO) => t.id;

  /** Carregar lista */
  getTasks(): void {
    this.service.getTasks().subscribe({
      next: (data: TaskDTO[]) => {
        this.tasks = data ?? [];
      },
      error: () => {
        this.toastr.error('Ocorreu um erro ao buscar as tarefas!');
      },
    });
  }

  /** Abrir diálogo de criação */
  openCreateTaskDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '400px',
      // data: { mode: 'create' } // se quiser diferenciar
    });

    dialogRef.afterClosed().subscribe((isSuccess: boolean) => {
      if (isSuccess) this.getTasks();
    });
  }

  /** Marcar/desmarcar tarefa */
  onToggle(id: number): void {
    // Otimista no front:
    this.tasks = this.tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );

    // Chamada real (descomente quando tiver endpoint):
    // this.service.toggleTask(id).subscribe({
    //   next: () => this.getTasks(),
    //   error: () => {
    //     this.toastr.error('Não foi possível atualizar a tarefa.');
    //     // rollback otimista (opcional)
    //     this.tasks = this.tasks.map(t =>
    //       t.id === id ? { ...t, completed: !t.completed } : t
    //     );
    //   }
    // });
  }

  /** Excluir tarefa */
  onDelete(id: number): void {
    // Otimista:
    const prev = this.tasks;
    this.tasks = this.tasks.filter(t => t.id !== id);

    // this.service.deleteTask(id).subscribe({
    //   next: () => this.toastr.success('Tarefa removida'),
    //   error: () => {
    //     this.toastr.error('Não foi possível remover a tarefa.');
    //     this.tasks = prev; // rollback
    //   }
    // });
  }

  /** Editar tarefa */
  onEdit(id: number): void {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '400px',
      data: { id } // seu dialog lê o id e entra em modo edição
    });

    dialogRef.afterClosed().subscribe((isSuccess: boolean) => {
      if (isSuccess) this.getTasks();
    });
  }

  /** Logout (placeholder) */
  logout(): void {
    // implemente sua lógica de saída
  }
}
