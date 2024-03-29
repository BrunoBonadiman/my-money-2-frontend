import { Component, Input, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { NgForm } from "@angular/forms";
import { Contas } from "../../apis/model/contas-model";
import { ContasService } from "../../apis/service/contas.service";
import Swal from "sweetalert2";
import { ExcelService } from "../../apis/service/excel.service";
import { ContasBrunoService } from "../../apis/service/contas-bruno.service";
import { ContasDecoService } from "../../apis/service/contas-deco.service";
import { ContasFrancieleService } from "../../apis/service/contas-franciele.service";
import { ContasPenhaService } from "../../apis/service/contas-penha.service";
import { ContasBruno } from "../../apis/model/contas-bruno-model";
import { ContasDeco } from "../../apis/model/contas-deco-model";
import { ContasFranciele } from "../../apis/model/contas-franciele-model";
import { ContasPenha } from "../../apis/model/contas-penha-model";
import { UserService } from "../../shared/user.service";
import { User } from "../../shared/user.model";
import { IntegrantesService } from "../../apis/service/integrantes.service";
import { Integrantes } from "../../apis/model/integrantes-model";
import { Router } from '@angular/router';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  providers: [
    ContasService,
    ExcelService,
    UserService,
    ContasBrunoService,
    ContasFrancieleService,
    ContasDecoService,
    ContasPenhaService,
    IntegrantesService
  ],
})
export class HomeComponent implements OnInit {
  exibirFormularioEdicao = false;

  valorCalculado = 0;

  user: User;
  integrante: Integrantes[] = [];
  contas: Contas[] = [];
  contas2: Contas;
  contasBruno: ContasBruno[] = [];
  contasDeco: ContasDeco[] = [];
  contasFranciele: ContasFranciele[] = [];
  contasPenha: ContasPenha[] = [];

  mes = [
    'Janeiro/2021',
    'Fevereiro/2021',
    'Março/2021',
    'Abril/2021',
    'Maio/2021',
    'Junho/2021',
    'Julho/2021',
    'Agosto/2021',
    'Setembro/2021',
    'Outubro/2021',
    'Novembro/2021',
    'Dezembro/2021'
  ];

  p: number = 1;
  openNavbar: boolean;

  constructor(
    public contasService: ContasService,
    public contasBrunoService: ContasBrunoService,
    public contasDecoService: ContasDecoService,
    public contasFrancieleService: ContasFrancieleService,
    public contasPenhaService: ContasPenhaService,
    public integrantesService: IntegrantesService,
    private excelService: ExcelService,
    private userService: UserService,
    private location: Location,
    private router: Router
  ) {}

  key: string = "descricao";
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  showNavbar(): void{
    this.openNavbar = !this.openNavbar;
  }

   recuperarDadosTabela() {
    let array: Array<any> = [];
    for (let conta of this.contas) {
      array.push({
        "Conta": conta.descricao,
        "Valor": conta.valorTotal,
        "Vencimento": conta.vencimento,
        "Status": conta.status
      });
    }
    return array;
  }
  recuperaValorTotal2() {
    let aux = 0;
    for (let conta of this.contas) {
      aux += parseFloat(conta.valorTotal.toString());
    }
    return aux.toFixed(2);
  }

   recuperaValorTotalBruno() {
    let aux = 0;
    for (let conta of this.contasBruno) {
      aux += parseFloat(conta.valor.toString());
    }
    return aux.toFixed(2);
  }

  recuperaValorTotalDeco() {
    let aux = 0;
    for (let conta of this.contasDeco) {
      aux += parseFloat(conta.valor.toString());
    }
    return aux.toFixed(2);
  }

  recuperaValorTotalFranciele() {
    let aux = 0;
    for (let conta of this.contasFranciele) {
      aux += parseFloat(conta.valor.toString());
    }
    return aux.toFixed(2);
  }

  recuperaValorTotalPenha() {
    let aux = 0;
    for (let conta of this.contasPenha) {
      aux += parseFloat(conta.valor.toString());
    }
    return aux.toFixed(2);
  }

  ngOnInit() {
    this.resetForm();
    this.refreshContas();
    this.listarContasBruno();
    this.listarContasDeco();
    this.listarContasFranciele();
    this.listarContasPenha();
    this.listarIntegrantes();
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
      location.reload();
    });
  }

  onClose() {
    this.exibirFormularioEdicao = false;
  }

  refreshContas() {
    this.userService.getUserProfile().subscribe((usuario: any) => {
      this.user = usuario as User;
      usuario.user.fullName;

      this.contasService.getContas().subscribe((res: Contas[]) => {
        res
          .filter((x) => !this.contas.map((x) => x._id).includes(x._id))
          .forEach((conta) => {
            this.userService.getUser(conta.user).subscribe((user: any) => {
              conta.userName = user.user.fullName;
              if (conta.userName == usuario.user.fullName) {
                this.contas.push(conta);
                return conta;
              } else {
                (err) => {
                  console.log(err);
                };
              }
            });
          });
      });
    });
  }

  listarIntegrantes(){
    this.integrantesService.getIntegrantes().subscribe((res) => {
      this.integrante = res as Integrantes[];
    });
  }

  listarContasBruno(){
    this.userService.getUserProfile().subscribe((usuario: any) => {
      this.user = usuario as User;
      usuario.user.fullName;

      this.contasBrunoService.getContasBruno().subscribe((res: ContasBruno[]) => {
        res
          .filter((x) => !this.contasBruno.map((x) => x._id).includes(x._id))
          .forEach((conta) => {
            this.userService.getUser(conta.user).subscribe((user: any) => {
              conta.userName = user.user.fullName;
              if (conta.userName == usuario.user.fullName) {
                this.contasBruno.push(conta);
                return conta;
              } else {
                (err) => {
                  console.log(err);
                };
              }
            });
          });
      });
    });
  }

  listarContasDeco(){
    this.userService.getUserProfile().subscribe((usuario: any) => {
      this.user = usuario as User;
      usuario.user.fullName;

      this.contasDecoService.getContasDeco().subscribe((res: ContasDeco[]) => {
        res
          .filter((x) => !this.contasDeco.map((x) => x._id).includes(x._id))
          .forEach((conta) => {
            this.userService.getUser(conta.user).subscribe((user: any) => {
              conta.userName = user.user.fullName;
              if (conta.userName == usuario.user.fullName) {
                this.contasDeco.push(conta);
                return conta;
              } else {
                (err) => {
                  console.log(err);
                };
              }
            });
          });
      });
    });
  }

  listarContasFranciele(){
    this.userService.getUserProfile().subscribe((usuario: any) => {
      this.user = usuario as User;
      usuario.user.fullName;

      this.contasFrancieleService.getContasFranciele().subscribe((res: ContasFranciele[]) => {
        res
          .filter((x) => !this.contasFranciele.map((x) => x._id).includes(x._id))
          .forEach((conta) => {
            this.userService.getUser(conta.user).subscribe((user: any) => {
              conta.userName = user.user.fullName;
              if (conta.userName == usuario.user.fullName) {
                this.contasFranciele.push(conta);
                return conta;
              } else {
                (err) => {
                  console.log(err);
                };
              }
            });
          });
      });
    });
  }

  listarContasPenha(){
    this.userService.getUserProfile().subscribe((usuario: any) => {
      this.user = usuario as User;
      usuario.user.fullName;

      this.contasPenhaService.getContasPenha().subscribe((res: ContasPenha[]) => {
        res
          .filter((x) => !this.contasPenha.map((x) => x._id).includes(x._id))
          .forEach((conta) => {
            this.userService.getUser(conta.user).subscribe((user: any) => {
              conta.userName = user.user.fullName;
              if (conta.userName == usuario.user.fullName) {
                this.contasPenha.push(conta);
                return conta;
              } else {
                (err) => {
                  console.log(err);
                };
              }
            });
          });
      });
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
      location.reload();
    });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(
      this.recuperarDadosTabela(),
      "Despesas"
    );
  }
}
