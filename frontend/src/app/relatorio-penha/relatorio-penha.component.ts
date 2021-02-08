import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ContasPenhaService } from '../service/contas-penha.service';
import { ExcelService } from '../service/excel.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { ContasPenha } from '../model/contas-penha-model';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-relatorio-penha',
  templateUrl: './relatorio-penha.component.html',
  styleUrls: ['./relatorio-penha.component.scss'],
  providers: [ContasPenhaService, ExcelService, UserService]
})
export class RelatorioPenhaComponent implements OnInit {

  exibirFormularioEdicao = false;
  valorCalculado = 0;
  user: User;
  contasPenha: ContasPenha[] = [];
  p: number = 1;

  constructor(
    public contasPenhaService: ContasPenhaService,
    private excelService: ExcelService,
    private userService: UserService,
    private location: Location,
    private router: Router
  ) { }

  key: string = 'descricao';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  recuperarDadosTabela() {
    let array: Array<any> = [];
    for (let conta of this.contasPenha) {
      array.push({
        "Id": conta._id,
        "Conta": conta.descricao,
        "Detalhe": conta.detalhe,
        "Valor": conta.valor,
        "Vencimento": conta.vencimento,
        "Parcela": conta.parcela,
        "Status": conta.status,
      });
    }
    return array;
  }

  // recuperaValorTotal() {
  //   var aux = 0;
  //   this.contasPenhaService.getContasPenha().subscribe((res) => {
  //     this.contasPenha = res as ContasPenha[];
  //     res.forEach(function (item) {
  //       aux += parseFloat(item.valor.toString());
  //     });
  //     this.valorCalculado = aux;
  //     Swal.fire('Valor Total: ' + 'R$' + this.valorCalculado.toFixed(2));
  //   });
  // }

  recuperarValorTotal2(){
    let aux = 0;
    for (let conta of this.contasPenha) {
      aux += parseFloat(conta.valor.toString());
    }
    return aux.toFixed(2);
  }

  ngOnInit() {
    this.resetForm();
    this.refreshContas();
  }

  cadastrarNovaConta(form: NgForm) {
    this.contasPenhaService.addContaPenha(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshContas();
      Swal.fire("Sucesso!", "Conta cadastrada com sucesso!", "success");
    });
  }

  resetForm(form?: NgForm) {
    if (form) form.reset();
    this.contasPenhaService.selectContaPenha = {
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
    this.contasPenhaService.updateContaPenha(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshContas();
      Swal.fire("Sucesso!", "Registro atualizado com sucesso!", "success");
      this.exibirFormularioEdicao = false;
      location.reload();
    });
  }

  onClose() {
    this.exibirFormularioEdicao = false;
  }

  refreshContas() {
    this.userService.getUserProfile().subscribe((usuario:any) => {
      this.user = usuario as User;
      usuario.user.fullName;

      this.contasPenhaService.getContasPenha().subscribe((res: ContasPenha[]) => {
        res.filter(x => !this.contasPenha.map(x => x._id).includes(x._id)).forEach(conta => {
          this.userService.getUser(conta.user).subscribe((user: any) => {
            conta.userName = user.user.fullName;
            if(conta.userName == usuario.user.fullName){
              this.contasPenha.push(conta);
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

  onEdit(contas: ContasPenha) {
    this.exibirFormularioEdicao = true;
    this.contasPenhaService.selectContaPenha = contas;
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
        this.contasPenhaService.deleteContaPenha(_id).subscribe((res) => {
          this.refreshContas();
          this.resetForm(form);
          Swal.fire("Sucesso!", "Conta deletada com sucesso!", "success");
        });
      }
      location.reload();
    });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(
      this.recuperarDadosTabela(),
      "Despesas_Penha"
    );
  }

  voltarParaTelaInicial(): void {
    this.router.navigate(['/dashboard']);
  }
}
