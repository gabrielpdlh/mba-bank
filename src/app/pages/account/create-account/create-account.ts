import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { AccountService } from '../../../shared/services/account/account-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../shared/models/client';
import { ClientService } from '../../../shared/services/client/client-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-account',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './create-account.html',
  styleUrl: './create-account.css',
})
export class CreateAccount implements OnInit {
  formGroup: FormGroup;
  clientes: Client[] = [];

  constructor(
    private ClientService: ClientService,
    private AccountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formGroup = new FormGroup({
      id: new FormControl(null),
      cliente: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      agencia: new FormControl('', Validators.required),
      saldo: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.ClientService.list().subscribe({
      next: (response) => {
        this.clientes = response;
      },
    });
  }

  add() {
    console.log(55)
    const data = this.formGroup.value;
    this.AccountService.add(data).subscribe({
      next: () => {
        console.log('lalalala')
      }
    });
  }
}
