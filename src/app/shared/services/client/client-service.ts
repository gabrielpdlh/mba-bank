import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../models/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  api = `${environment.api}/clientes/`;

  constructor(private clienteHttp: HttpClient) {}

  add(newClient: Client): Observable<Client> {
    return this.clienteHttp.post<Client>(this.api, newClient);
  }

  list(): Observable<Client[]> {
    return this.clienteHttp.get<Client[]>(this.api);
  }

  listPage(page: number, pageSize: number): Observable<Client[]> {
    return this.clienteHttp.get<Client[]>(`${this.api}?page=${page}&pageSize=${pageSize}`);
  }

  delete(ClientId: number): Observable<object>{
    return this.clienteHttp.delete(`${this.api}${ClientId}`)
  }

  searchById(id: number): Observable<Client> {
    return this.clienteHttp.get<Client>(`${this.api}${id}`)
  }

  update(cliente: Client): Observable<Client>{
    return this.clienteHttp.put<Client>(`${this.api}${cliente}`, cliente)
  }

}
