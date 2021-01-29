import { Component, OnInit } from '@angular/core';
import { ContasDecoService } from '../service/contas-deco.service';
import { ExcelService } from '../service/excel.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { ContasDeco } from '../model/contas-deco-model';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-relatorio-deco',
  templateUrl: './relatorio-deco.component.html',
  styleUrls: ['./relatorio-deco.component.scss'],
  providers: [ContasDecoService, ExcelService, UserService]
})
export class RelatorioDecoComponent implements OnInit {

  exibirFormularioEdicao = false;
  valorCalculado = 0;
  user: User;
  contasDeco: ContasDeco[] = [];

  p: number = 1;

  constructor(
    public contasDecoService: ContasDecoService,
    private excelService: ExcelService,
    private userService: UserService
  ) {}

  key: string = 'descricao';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  recuperarDadosTabela() {
    let array: Array<any> = [];
    for (let conta of this.contasDeco) {
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
    this.contasDecoService.getContasDeco().subscribe((res) => {
      this.contasDeco = res as ContasDeco[];
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
    this.contasDecoService.addContaDeco(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshContas();
      Swal.fire("Sucesso!", "Conta cadastrada com sucesso!", "success");
    });
  }

  resetForm(form?: NgForm) {
    if (form) form.reset();
    this.contasDecoService.selectContaDeco = {
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
    this.contasDecoService.updateContaDeco(form.value).subscribe((res) => {
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
    this.userService.getUserProfile().subscribe((usuario:any) => {
      this.user = usuario as User;
      usuario.user.fullName;

      this.contasDecoService.getContasDeco().subscribe((res: ContasDeco[]) => {
        res.filter(x => !this.contasDeco.map(x => x._id).includes(x._id)).forEach(conta => {
          this.userService.getUser(conta.user).subscribe((user: any) => {
            conta.userName = user.user.fullName;
            if(conta.userName == usuario.user.fullName){
              this.contasDeco.push(conta);
              return conta;
            }else{
              (err) => {
                console.log(err);
              }
            }
          });
        });
      });
    });
  }

  onEdit(contas: ContasDeco) {
    this.exibirFormularioEdicao = true;
    this.contasDecoService.selectContaDeco = contas;
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
        this.contasDecoService.deleteContaDeco(_id).subscribe((res) => {
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
      "Despesas_Deco"
    );
  }
}
