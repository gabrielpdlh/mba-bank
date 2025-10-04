import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Account } from '../../models/account';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  api = `${environment.api}/contas/`;

  constructor(private clienteHttp: HttpClient) {}

  add(data: Account) {
    return this.clienteHttp.post<Account>(this.api, data);
  }

  list(): Observable<Account[]> {
    return this.clienteHttp.get<Account[]>(this.api);
  }

  listPage(page: number, pageSize: number): Observable<Account[]> {
      return this.clienteHttp.get<Account[]>(`${this.api}?page=${page}&pageSize=${pageSize}`);
    }
  
    delete(AccountId: number): Observable<object>{
      return this.clienteHttp.delete(`${this.api}${AccountId}`)
    }
  
    searchById(id: number): Observable<Account> {
      return this.clienteHttp.get<Account>(`${this.api}${id}`)
    }
  
    update(account: Account): Observable<Account>{
      return this.clienteHttp.put<Account>(`${this.api}${account}`, account)
    }
}
