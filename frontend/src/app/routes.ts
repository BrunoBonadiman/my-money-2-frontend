import { Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { SignUpComponent } from './pages/user/sign-up/sign-up.component';
import { SignInComponent } from './pages/user/sign-in/sign-in.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { RelatorioBrunoComponent } from './pages/relatorio-bruno/relatorio-bruno.component';
import { RelatorioFrancieleComponent } from './pages/relatorio-franciele/relatorio-franciele.component';
import { RelatorioPenhaComponent } from './pages/relatorio-penha/relatorio-penha.component';
import { RelatorioDecoComponent } from './pages/relatorio-deco/relatorio-deco.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { FooterComponent } from './components/footer/footer.component';
import { CadastroIntegrantesComponent } from './pages/cadastro-integrantes/cadastro-integrantes.component';
import { GraficoComponent } from './pages/grafico/grafico.component';
import { ValoresMensaisComponent } from './pages/valores-mensais/valores-mensais.component';

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
    path: 'perfil',
    component: PerfilComponent,
  },
  {
    path: 'footer',
    component: FooterComponent,
  },
  {
    path: 'integrantes',
    component: CadastroIntegrantesComponent
  },
  {
    path: 'grafico',
    component: GraficoComponent
  },
  {
    path: 'valores-mensais',
    component: ValoresMensaisComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
