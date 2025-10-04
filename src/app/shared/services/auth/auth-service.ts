import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../../models/auth';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = `${environment.api}/auth/`

  constructor(private clienteHttp: HttpClient) {}

  login(data: Auth) {
    return this.clienteHttp.post(this.api, data)
  }

  
  
}
