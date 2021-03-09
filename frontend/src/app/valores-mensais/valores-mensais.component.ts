import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Grafico } from '../model/grafico-model';
import { GraficoService } from '../service/grafico.service';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-valores-mensais',
  templateUrl: './valores-mensais.component.html',
  styleUrls: ['./valores-mensais.component.scss']
})
export class ValoresMensaisComponent implements OnInit {

  exibirFormularioEdicao: Boolean;
  user: User;
  grafico: Grafico[] = [];
  array: Array<any> = [];
  p: number = 1;

  constructor(public graficoService: GraficoService, private userService: UserService, private location: Location, private router: Router) { }

  key: string = "valor";
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  ngOnInit() {
    this.resetForm();
    this.refreshDados();
    console.log(this.recuperarListaDeValores());
  }

  recuperarListaDeValores(){
    for(let valor of this.grafico){
      this.array.push({
        Valor: valor.valor
      });
    }
    return this.array;
  }

  cadastrarNovoDado(form: NgForm) {
    this.graficoService.addDado(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshDados();
      Swal.fire("Sucesso!", "Dado cadastrado com sucesso!", "success");
    });
  }

  resetForm(form?: NgForm) {
    if (form) form.reset();
    this.graficoService.selectDado = {
      _id: "",
      valor: "",
      mes: "",
      ano: ""
    };
  }

  onSubmit(form: NgForm) {
    this.graficoService.updateDado(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshDados();
      Swal.fire("Sucesso!", "Registro atualizado com sucesso!", "success");
      this.exibirFormularioEdicao = false;
    });
  }

  onClose() {
    this.exibirFormularioEdicao = false;
  }

  refreshDados() {
    this.userService.getUserProfile().subscribe((usuario: any) => {
      this.user = usuario as User;
      usuario.user.fullName;

      this.graficoService
        .getDados()
        .subscribe((res: Grafico[]) => {
          res
            .filter((x) => !this.grafico.map((x) => x._id).includes(x._id))
            .forEach((grafico) => {
              this.userService
                .getUser(grafico.user)
                .subscribe((user: any) => {
                  grafico.userName = user.user.fullName;
                  if (grafico.userName == usuario.user.fullName) {
                    this.grafico.push(grafico);
                    return grafico;
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

  onEdit(grafico: Grafico) {
    this.exibirFormularioEdicao = true;
    this.graficoService.selectDado = grafico;
  }

  onDelete(_id: string, form: NgForm) {
    Swal.fire({
      title: "Tem certeza que deseja deletar o Integrante: " + _id + "?",
      text: "Após confirmar, a ação não poderá ser revertida!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.value) {
        this.graficoService.deleteDado(_id).subscribe((res) => {
          this.refreshDados();
          this.resetForm(form);
          Swal.fire("Sucesso!", "Dado deletado com sucesso!", "success");
        });
      }
    });
  }

  voltarParaGrafico(): void {
    this.router.navigate(['/grafico']);
  }
}
