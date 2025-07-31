import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { LoginRequestInterface } from '../interfaces/login-interface';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../service/storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
})
export class LoginComponent implements OnInit {
  show: boolean = false;
  loginForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.formLoginContructor();
  }

  formLoginContructor() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.loading = true;

    setTimeout(() => {
      this.loginService
        .login(this.loginForm.value as LoginRequestInterface)
        .subscribe({
          next: (data: any) => {
            this.toastr.success(
              'Login realizado com sucesso!',
              'Bem-vindo de volta!'
            );
            this.loading = false;
            this.storageService.setItem('token', data.token);
            this.router.navigate(['/home'])
          },
          error: () => {
            this.toastr.error('E-mail ou senha incorretos.', 'Falha no login');
            this.loading = false;
          },
        });
    }, 1000);
  }
}
