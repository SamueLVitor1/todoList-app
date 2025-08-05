import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskService } from '../../service/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
  ],
  styleUrls: ['./create-task-dialog.component.css'],
})
export class CreateTaskDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    private service: TaskService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      description: ['', Validators.required],
    });
  }

  save() {
    this.service.createTask(this.form.value).subscribe({
      next: () => {
        this.toastr.success('Tarefa criada com sucesso!');
        this.close(true);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erro ao criar tarefa!');
      },
    });
  }

  close(isSucess?: boolean) {
    this.dialogRef.close(isSucess);
  }
}
