import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../shared/models/client';
import { ClientService } from '../../../shared/services/client/client-service';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cadastro-cliente',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ],
  templateUrl: './register-cliente.html',
  styleUrl: './register-cliente.css',
})
export class CadastroClienteComponent implements OnInit {
  edit;
  formGroup: FormGroup;

  constructor(
    private ClientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formGroup = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      observacoes: new FormControl('', Validators.required),
      ativo: new FormControl(true),
    });
    this.edit = false;
  }

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.edit = true;
      this.ClientService.searchById(this.route.snapshot.params['id']).subscribe((cliente) => {
        this.formGroup.patchValue(cliente);
      });
    }
  }

  add() {
    const cliente: Client = this.formGroup.value;
    if (this.edit) {
      this.ClientService.update(cliente).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Cliente atualizado com sucesso!',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['/cliente']);
        },
        error: (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao atualizar cliente!',
          });
        },
      });
    } else {
      this.ClientService.add(cliente).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Cliente cadastrado com sucesso!',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['/cliente']);
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao cadastrar cliente!',
          });
        },
      });
    }
  }
}
