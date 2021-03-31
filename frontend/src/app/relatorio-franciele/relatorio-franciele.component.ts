import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ContasFranciele } from '../model/contas-franciele-model';
import { ContasFrancieleService } from '../service/contas-franciele.service';
import { ExcelService } from '../service/excel.service';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-relatorio-franciele',
  templateUrl: './relatorio-franciele.component.html',
  styleUrls: ['./relatorio-franciele.component.scss'],
  providers: [ContasFrancieleService, ExcelService, UserService]
})
export class RelatorioFrancieleComponent implements OnInit {

  exibirFormularioEdicao = false;
  valorCalculado = 0;
  contasFranciele: ContasFranciele[] = [];
  user: User;
  p: number = 1;
  openNavbar: boolean;

  constructor(
    public contasFrancieleService: ContasFrancieleService,
    private excelService: ExcelService,
    private userService: UserService,
    private location: Location,
    private router: Router
  ) {}

  key: string = 'descricao';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  recuperarDadosTabela() {
    let array: Array<any> = [];
    for (let conta of this.contasFranciele) {
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

  showNavbar(): void{
    this.openNavbar = !this.openNavbar;
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  recuperarValorTotal2(){
    let aux = 0;
    for (let conta of this.contasFranciele) {
      aux += parseFloat(conta.valor.toString());
    }
    return aux.toFixed(2);
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

      this.contasFrancieleService.getContasFranciele().subscribe((res: ContasFranciele[]) => {
        res.filter(x => !this.contasFranciele.map(x => x._id).includes(x._id)).forEach(conta => {
          this.userService.getUser(conta.user).subscribe((user: any) => {
            conta.userName = user.user.fullName;
            if(conta.userName == usuario.user.fullName){
              this.contasFranciele.push(conta);
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
      location.reload();
    });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(
      this.recuperarDadosTabela(),
      "Despesas_Franciele"
    );
  }

  voltarParaTelaInicial(): void {
    this.router.navigate(['/dashboard']);
  }
}
