import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { IntegrantesService } from "../service/integrantes.service";
import Swal from "sweetalert2";
import { NgForm } from "@angular/forms";
import { Integrantes } from "../model/integrantes-model";
import { UserService } from "../shared/user.service";
import { User } from "../shared/user.model";

@Component({
  selector: "app-cadastro-integrantes",
  templateUrl: "./cadastro-integrantes.component.html",
  styleUrls: ["./cadastro-integrantes.component.scss"],
  providers: [IntegrantesService],
})
export class CadastroIntegrantesComponent implements OnInit {
  exibirFormularioEdicao = false;
  user: User;
  integrantes: Integrantes[] = [];

  constructor(
    public integrantesService: IntegrantesService,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit() {
    this.resetForm();
    this.refreshIntegrantes();
  }

  cadastrarNovaConta(form: NgForm) {
    this.integrantesService.addIntegrantes(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshIntegrantes();
      Swal.fire("Sucesso!", "Integrante cadastrado com sucesso!", "success");
    });
  }

  resetForm(form?: NgForm) {
    if (form) form.reset();
    this.integrantesService.selectIntegrante = {
      _id: "",
      integrante1: "",
      integrante2: "",
      integrante3: "",
      integrante4: "",
    };
  }

  onSubmit(form: NgForm) {
    this.integrantesService.updateIntegrante(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshIntegrantes();
      Swal.fire("Sucesso!", "Registro atualizado com sucesso!", "success");
      this.exibirFormularioEdicao = false;
      location.reload();
    });
  }

  onClose() {
    this.exibirFormularioEdicao = false;
  }

  refreshIntegrantes() {
    this.userService.getUserProfile().subscribe((usuario: any) => {
      this.user = usuario as User;
      usuario.user.fullName;

      this.integrantesService
        .getIntegrantes()
        .subscribe((res: Integrantes[]) => {
          res
            .filter((x) => !this.integrantes.map((x) => x._id).includes(x._id))
            .forEach((integrante) => {
              this.userService
                .getUser(integrante.user)
                .subscribe((user: any) => {
                  integrante.userName = user.user.fullName;
                  if (integrante.userName == usuario.user.fullName) {
                    this.integrantes.push(integrante);
                    return integrante;
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

  onEdit(integrantes: Integrantes) {
    this.exibirFormularioEdicao = true;
    this.integrantesService.selectIntegrante = integrantes;
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
        this.integrantesService.deleteIntegrante(_id).subscribe((res) => {
          this.refreshIntegrantes();
          this.resetForm(form);
          Swal.fire("Sucesso!", "Integrante deletado com sucesso!", "success");
        });
      }
      location.reload();
    });
  }
}
