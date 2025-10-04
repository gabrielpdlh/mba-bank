import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Client } from '../../../shared/models/client';
import { ClientService } from '../../../shared/services/client/client-service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-list-client',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, RouterLink, MatButton],
  templateUrl: './list-client.html',
  styleUrl: './list-client.css',
})
export class ListClient implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'status', 'funcoes'];
  dataSource = new MatTableDataSource<Client>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private clienteService: ClientService) {}

  ngAfterViewInit() {
    this.listClients(1, 5);
  }

  listClients(page: number, pageSize: number) {
    this.clienteService.listPage(page, pageSize).subscribe((clients) => {
      this.dataSource.data = clients;
    });
  }

  onPageChange(event: PageEvent) {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.listClients(pageIndex, pageSize);
  }

  deleteClient(id: number) {
    Swal.fire({
      title: 'Você tem certeza que deseja deletar?',
      text: 'Não tem como reverter essa ação',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Deletar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Sucesso',
              text: 'Cliente deletado com sucesso!',
              showConfirmButton: false,
              timer: 1500,
            });
            this.listClients(1, 5);
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Erro ao deletar cliente!',
            });
          },
        });
      }
    });
  }
}