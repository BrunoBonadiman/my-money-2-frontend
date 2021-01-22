import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { RelatorioBrunoComponent } from './relatorio-bruno/relatorio-bruno.component';
import { RelatorioFrancieleComponent } from './relatorio-franciele/relatorio-franciele.component';
import { RelatorioPenhaComponent } from './relatorio-penha/relatorio-penha.component';
import { RelatorioDecoComponent } from './relatorio-deco/relatorio-deco.component';

export const appRoutes: Routes = [
  {
    path: 'signup',
    component: UserComponent,
    children: [{ path: '', component: SignUpComponent }],
  },
  {
    path: 'login',
    component: UserComponent,
    children: [{ path: '', component: SignInComponent }],
  },
  {
    path: 'home',
    component: SidebarComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  {
    path: 'dashboard',
    component: HomeComponent,
  },
  {
    path: 'relatorio-bruno',
    component: RelatorioBrunoComponent,
  },
  {
    path: 'relatorio-franciele',
    component: RelatorioFrancieleComponent,
  },
  {
    path: 'relatorio-deco',
    component: RelatorioDecoComponent,
  },
  {
    path: 'relatorio-penha',
    component: RelatorioPenhaComponent,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
