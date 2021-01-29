import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contas } from '../model/contas-model';
import { ContasService } from '../service/contas.service';
import swal from 'sweetalert2';
import { IMyOptions } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  providers: [ContasService]
})
export class CadastroComponent{

  constructor(public contasService: ContasService) { }

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
