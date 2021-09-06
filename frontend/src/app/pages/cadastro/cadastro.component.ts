import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contas } from '../../apis/model/contas-model';
import { ContasService } from '../../apis/service/contas.service';
import swal from 'sweetalert2';
import { IMyOptions } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  providers: [ContasService]
})
export class CadastroComponent {

  openNavbar:boolean;

  constructor(public contasService: ContasService, private router: Router, private userService: UserService) { }

  onSubmit(form: NgForm) {
    this.contasService.addConta(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshContas();
      swal.fire('Sucesso!', 'Conta cadastrada com sucesso!', 'success');
    });
  }

  refreshContas() {
    this.contasService.getContas().subscribe((res) => {
      this.contasService.contas = res as Contas[];
    });
  }

  showNavbar(): void {
    this.openNavbar = !this.openNavbar;
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  resetForm(form?: NgForm) {
    if (form)
    form.reset();
    this.contasService.selectConta = {
      _id: "",
      descricao: "",
      valorTotal: "",
      vencimento: "",
      status: ""
    }
  }
}
