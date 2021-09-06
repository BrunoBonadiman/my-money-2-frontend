import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";

import { ButtonsModule, MDBBootstrapModule, ModalModule, PopoverModule, TooltipModule } from "angular-bootstrap-md";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserComponent } from "./pages/user/user.component";
import { SignInComponent } from "./pages/user/sign-in/sign-in.component";
import { SignUpComponent } from "./pages/user/sign-up/sign-up.component";
import { UserService } from "./shared/user.service";
import { InterceptorService } from "./auth/auth.interceptor";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./routes";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { CadastroComponent } from "./pages/cadastro/cadastro.component";
import { ContasService } from "./apis/service/contas.service";
import { ContasBrunoService } from "./apis/service/contas-bruno.service";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { HomeComponent } from "./pages/home/home.component";
import { DataTablesModule } from "angular-datatables";
import { ExcelService } from "./apis/service/excel.service";
import { RelatorioBrunoComponent } from "./pages/relatorio-bruno/relatorio-bruno.component";
import { RelatorioFrancieleComponent } from "./pages/relatorio-franciele/relatorio-franciele.component";
import { ContasFrancieleService } from "./apis/service/contas-franciele.service";
import { RelatorioDecoComponent } from './pages/relatorio-deco/relatorio-deco.component';
import { RelatorioPenhaComponent } from './pages/relatorio-penha/relatorio-penha.component';
import { ContasDecoService } from "./apis/service/contas-deco.service";
import { ContasPenhaService } from "./apis/service/contas-penha.service";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { Ng2OrderModule } from "ng2-order-pipe";
import { NgxPaginationModule } from "ngx-pagination";
import { HttpModule } from "@angular/http";
import { PerfilComponent } from './pages/perfil/perfil.component';
import { FooterComponent } from './components/footer/footer.component';
import { CadastroIntegrantesComponent } from './pages/cadastro-integrantes/cadastro-integrantes.component';
import { IntegrantesService } from "./apis/service/integrantes.service";
import { GraficoComponent } from './pages/grafico/grafico.component';
import { ValoresMensaisComponent } from "./pages/valores-mensais/valores-mensais.component";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent,
    SidebarComponent,
    CadastroComponent,
    HomeComponent,
    RelatorioBrunoComponent,
    RelatorioFrancieleComponent,
    RelatorioDecoComponent,
    RelatorioPenhaComponent,
    PerfilComponent,
    FooterComponent,
    CadastroIntegrantesComponent,
    GraficoComponent,
    ValoresMensaisComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: "legacy" }),
    FormsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    DataTablesModule,
    ModalModule,
    TooltipModule,
    PopoverModule,
    ButtonsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule
  ],
  providers: [
    UserService,
    ExcelService,
    ContasService,
    ContasBrunoService,
    ContasFrancieleService,
    ContasDecoService,
    ContasPenhaService,
    IntegrantesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
