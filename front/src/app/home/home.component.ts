import { Component, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Contas } from "../model/contas-model";
import { ContasService } from "../service/contas.service";
import Swal from "sweetalert2";
import { ExcelService } from "../service/excel.service";
import { ContasBrunoService } from "../service/contas-bruno.service";
import { ContasDecoService } from "../service/contas-deco.service";
import { ContasFrancieleService } from "../service/contas-franciele.service";
import { ContasPenhaService } from "../service/contas-penha.service";
import { ContasBruno } from "../model/contas-bruno-model";
import { ContasDeco } from "../model/contas-deco-model";
import { ContasFranciele } from "../model/contas-franciele-model";
import { ContasPenha } from "../model/contas-penha-model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  providers: [ContasService, ExcelService],
})
export class HomeComponent implements OnInit {
  exibirFormularioEdicao = false;

  valorCalculado = 0;
  valorBruno = 0;
  valorDeco = 0;
  valorFranciele = 0;
  valorPenha = 0;

  valorPrincipal: void = this.recuperaValorTotal();
  valorPrincipalBruno: void = this.recuperaValorTotalBruno();
  valorPrincipalDeco: void = this.recuperaValorTotalDeco();
  valorPrincipalFranciele: void = this.recuperaValorTotalFranciele();
  valorPrincipalPenha: void = this.recuperaValorTotalPenha();

  contas: Contas[] = [];

  p: number = 1;

  constructor(
    public contasService: ContasService,
    public contasBrunoService: ContasBrunoService,
    public contasDecoService: ContasDecoService,
    public contasFrancieleService: ContasFrancieleService,
    public contasPenhaService: ContasPenhaService,
    private excelService: ExcelService
  ) { }

  key: string = 'descricao';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  recuperarDadosTabela() {
    let array: Array<any> = [];
    for (let conta of this.contasService.contas) {
      array.push({
        Id: conta._id,
        Conta: conta.descricao,
        Valor: conta.valorTotal,
        Vencimento: conta.vencimento,
        Status: conta.status,
      });
    }
    return array;
  }

  recuperaValorTotal() {
    this.contasService.getContas().subscribe((res) => {
      this.contas = res;
      res.forEach(function (item) {
        this.valorCalculado += parseFloat(item.valorTotal.toString());
      });
      return `${this.valorCalculado.toFixed(2)}`;
    });
  }

  recuperaValorTotal2() {
    let aux = 0;
    this.contasService.getContas().subscribe((res) => {
      this.contas = res;
      res.forEach(function (item) {
        aux += parseFloat(item.valorTotal.toString());
      });
      this.valorCalculado = aux;
      Swal.fire('Valor Total: ' + 'R$' + this.valorCalculado.toFixed(2));
    });
  }

  recuperaValorTotalBruno() {
    let aux = 0;
    this.contasBrunoService.getContasBruno().subscribe((res) => {
      res.forEach(function (item) {
        aux += parseFloat(item.valor.toString());
      });
      this.valorBruno = aux;
      return `${this.valorBruno.toFixed(2)}`;
    });
    //Swal.fire('Valor Total: ' + 'R$' + this.valorBruno.toFixed(2));
  }

  recuperaValorTotalDeco() {
    let aux = 0;
    this.contasDecoService.getContasDeco().subscribe((res) => {
      res.forEach(function (item) {
        aux += parseFloat(item.valor.toString());
      });
      this.valorDeco = aux;
      return `${this.valorDeco.toFixed(2)}`;
    });
    //Swal.fire('Valor Total: ' + 'R$' + this.valorDeco.toFixed(2));
  }
  recuperaValorTotalFranciele() {
    let aux = 0;
    this.contasFrancieleService.getContasFranciele().subscribe((res) => {
      res.forEach(function (item) {
        aux += parseFloat(item.valor.toString());
      });
      this.valorFranciele = aux;
      return `${this.valorFranciele.toFixed(2)}`;
    });
    //Swal.fire('Valor Total: ' + 'R$' + this.valorFranciele.toFixed(2));
  }

  recuperaValorTotalPenha() {
    let aux = 0;
    this.contasPenhaService.getContasPenha().subscribe((res) => {
      res.forEach(function (item) {
        aux += parseFloat(item.valor.toString());
      });
      this.valorPenha = aux;
      return `${this.valorPenha.toFixed(2)}`;
    });
    //Swal.fire('Valor Total: ' + 'R$' + this.valorPenha.toFixed(2));
  }

  ngOnInit() {
    this.resetForm();
    this.refreshContas();
    this.recuperaValorTotal();
    this.recuperaValorTotalBruno();
    this.recuperaValorTotalDeco();
    this.recuperaValorTotalFranciele();
    this.recuperaValorTotalPenha();

    console.log(this.recuperaValorTotal());
  }

  cadastrarNovaConta(form: NgForm) {
    this.contasService.addConta(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshContas();
      Swal.fire("Sucesso!", "Conta cadastrada com sucesso!", "success");
    });
  }

  resetForm(form?: NgForm) {
    if (form) form.reset();
    this.contasService.selectConta = {
      _id: "",
      descricao: "",
      valorTotal: "",
      vencimento: "",
      status: "",
    };
  }

  onSubmit(form: NgForm) {
    this.contasService.updateConta(form.value).subscribe((res) => {
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
    this.contasService.getContas().subscribe((res) => {
      this.contasService.contas = res as Contas[];
    });
  }

  onEdit(contas: Contas) {
    this.exibirFormularioEdicao = true;
    this.contasService.selectConta = contas;
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
        this.contasService.deleteConta(_id).subscribe((res) => {
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
      "Despesas"
    );
  }
}
