import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ContasBrunoService } from '../service/contas-bruno.service';
import { ExcelService } from '../service/excel.service';
import Swal from 'sweetalert2';
import { ContasBruno } from '../model/contas-bruno-model';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-relatorio-bruno',
  templateUrl: './relatorio-bruno.component.html',
  styleUrls: ['./relatorio-bruno.component.scss'],
  providers: [ContasBrunoService, ExcelService, UserService]
})
export class RelatorioBrunoComponent implements OnInit {

  exibirFormularioEdicao = false;
  valorCalculado = 0;
  user: User;
  contasBruno: ContasBruno[] = [];

  p: number = 1;
  openNavbar: boolean;

  constructor(
    public contasBrunoService: ContasBrunoService,
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
    for (let conta of this.contasBruno) {
      array.push({
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
  recuperarValorTotal2(){
    let aux = 0;
    for (let conta of this.contasBruno) {
      aux += parseFloat(conta.valor.toString());
    }
    return aux.toFixed(2);
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
    this.contasBrunoService.updateContaBruno(form.value).subscribe((res) => {
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

  showNavbar(): void{
    this.openNavbar = !this.openNavbar;
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  refreshContas() {
    this.userService.getUserProfile().subscribe((usuario:any) => {
      this.user = usuario as User;
      usuario.user.fullName;

      this.contasBrunoService.getContasBruno().subscribe((res: ContasBruno[]) => {
        res.filter(x => !this.contasBruno.map(x => x._id).includes(x._id)).forEach(conta => {
          this.userService.getUser(conta.user).subscribe((user: any) => {
            conta.userName = user.user.fullName;
            if(conta.userName == usuario.user.fullName){
              this.contasBruno.push(conta);
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

  onEdit(contas: ContasBruno) {
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
      location.reload();
    });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(
      this.recuperarDadosTabela(),
      "Despesas_Bruno"
    );
  }

  voltarParaTelaInicial(): void {
    this.router.navigate(['/dashboard']);
  }
}
