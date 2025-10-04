import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroClienteComponent } from './pages/client/register-cliente/register-cliente';
import { ListClient } from './pages/client/list-client/list-client';
import { LoginTemplate } from './pages/auth/login-template/login-template';
import { CreateAccount } from './pages/account/create-account/create-account';

export const routes: Routes = [
  {
    path: 'auth',
    component: LoginTemplate,
  },
  {
    path: 'cliente',
    children: [
      {
        path: 'novo',
        component: CadastroClienteComponent,
      },
      {
        path: 'editar/:id',
        component: CadastroClienteComponent,
      },
      {
        path: '',
        component: ListClient,
      },
    ],
  },
  {
    path: 'contas',
    children: [
      {
        path: 'novo',
        component: CreateAccount,
      },
    ],
  },
  {
    path: '',
    component: ListClient,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
