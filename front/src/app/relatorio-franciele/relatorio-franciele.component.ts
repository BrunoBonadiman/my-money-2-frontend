import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ContasFranciele } from '../model/contas-franciele-model';
import { ContasFrancieleService } from '../service/contas-franciele.service';
import { ExcelService } from '../service/excel.service';

@Component({
  selector: 'app-relatorio-franciele',
  templateUrl: './relatorio-franciele.component.html',
  styleUrls: ['./relatorio-franciele.component.scss'],
  providers: [ContasFrancieleService, ExcelService]
})
export class RelatorioFrancieleComponent implements OnInit {

  exibirFormularioEdicao = false;
  valorCalculado = 0;
  p: number = 1;

  constructor(
    public contasFrancieleService: ContasFrancieleService,
    private excelService: ExcelService
  ) {}

  key: string = 'descricao';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  recuperarDadosTabela() {
    let array: Array<any> = [];
    for (let conta of this.contasFrancieleService.contas) {
      array.push({
        "Id": conta._id,
        "Conta": conta.descricao,
        "Detalhe": conta.detalhe,
        "Valor": conta.valor,
        "Vencimento": conta.vencimento,
        "Parcela": conta.parcela,
        "status": conta.status,
      });
    }
    return array;
  }

  recuperaValorTotal() {
    var aux = 0;
    this.contasFrancieleService.getContasFranciele().subscribe((res) => {
      this.contasFrancieleService.contas = res as ContasFranciele[];
      res.forEach(function (item) {
        aux += parseFloat(item.valor.toString());
      });
      this.valorCalculado = aux;
      Swal.fire('Valor Total: ' + 'R$' + this.valorCalculado.toFixed(2));
    });
    //return this.valorCalculado.toFixed(2);
  }

  ngOnInit() {
    this.resetForm();
    this.refreshContas();
  }

  cadastrarNovaConta(form: NgForm) {
    this.contasFrancieleService.addContaFranciele(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshContas();
      Swal.fire("Sucesso!", "Conta cadastrada com sucesso!", "success");
    });
  }

  resetForm(form?: NgForm) {
    if (form) form.reset();
    this.contasFrancieleService.selectContaFranciele = {
      _id: "",
      descricao: "",
      detalhe: "",
      valor: "",
      vencimento: "",
      parcela: "",
      status: ""
    };
  }

  onSubmit(form: NgForm) {
    debugger;
    this.contasFrancieleService.updateContaFranciele(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshContas();
      Swal.fire("Sucesso!", "Registro atualizado com sucesso!", "success");
      this.exibirFormularioEdicao = false;
    });
  }

  onClose() {
    this.exibirFormularioEdicao = false;
  }

  refreshContas() {
    this.contasFrancieleService.getContasFranciele().subscribe((res) => {
      this.contasFrancieleService.contas = res as ContasFranciele[];
    });
  }

  onEdit(contas: ContasFranciele) {
    debugger;
    this.exibirFormularioEdicao = true;
    this.contasFrancieleService.selectContaFranciele = contas;
  }

  onDelete(_id: string, form: NgForm) {
    Swal.fire({
      title: "Tem certeza que deseja deletar a Conta: " + _id + "?",
      text: "Após confirmar, a ação não poderá ser revertida!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.value) {
        this.contasFrancieleService.deleteContaFranciele(_id).subscribe((res) => {
          this.refreshContas();
          this.resetForm(form);
          Swal.fire("Sucesso!", "Conta deletada com sucesso!", "success");
        });
      }
    });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(
      this.recuperarDadosTabela(),
      "Despesas_Franciele"
    );
  }
}
