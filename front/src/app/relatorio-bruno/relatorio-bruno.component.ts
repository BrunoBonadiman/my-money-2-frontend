import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContasBrunoService } from '../service/contas-bruno.service';
import { ExcelService } from '../service/excel.service';
import Swal from 'sweetalert2';
import { ContasBruno } from '../model/contas-bruno-model';

@Component({
  selector: 'app-relatorio-bruno',
  templateUrl: './relatorio-bruno.component.html',
  styleUrls: ['./relatorio-bruno.component.scss'],
  providers: [ContasBrunoService, ExcelService]
})
export class RelatorioBrunoComponent implements OnInit {

  exibirFormularioEdicao = false;
  valorCalculado = 0;

  p: number = 1;

  constructor(
    public contasBrunoService: ContasBrunoService,
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
    for (let conta of this.contasBrunoService.contas) {
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
    this.contasBrunoService.getContasBruno().subscribe((res) => {
      this.contasBrunoService.contas = res as ContasBruno[];
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
    this.contasBrunoService.addContaBruno(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshContas();
      Swal.fire("Sucesso!", "Conta cadastrada com sucesso!", "success");
    });
  }

  resetForm(form?: NgForm) {
    if (form) form.reset();
    this.contasBrunoService.selectContaBruno = {
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
    this.contasBrunoService.updateContaBruno(form.value).subscribe((res) => {
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
    this.contasBrunoService.getContasBruno().subscribe((res) => {
      this.contasBrunoService.contas = res as ContasBruno[];
    });
  }

  onEdit(contas: ContasBruno) {
    debugger;
    this.exibirFormularioEdicao = true;
    this.contasBrunoService.selectContaBruno = contas;
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
        this.contasBrunoService.deleteContaBruno(_id).subscribe((res) => {
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
      "Despesas_Bruno"
    );
  }
}
