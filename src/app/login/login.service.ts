import { Injectable } from '@angular/core';
import { EnvironmentService } from '../service/environment.service';
import { HttpClient } from '@angular/common/http';
import { LoginRequestInterface, LoginResponseInterface } from '../interfaces/login-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(
    private env: EnvironmentService,
    private http: HttpClient
  ) { }

  login(body: LoginRequestInterface): Observable<LoginResponseInterface> {
    return this.http.post<LoginResponseInterface>(`${this.env.getHostURL()}/auth`, body);
  }
}
