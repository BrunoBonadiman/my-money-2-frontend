import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grafico } from '../../apis/model/grafico-model';
import { GraficoService } from '../../apis/service/grafico.service';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss'],
  providers: [GraficoService]
})
export class GraficoComponent implements OnInit {

  mes = [
    'Janeiro/2022',
    'Fevereiro/2022',
    'Março/2022',
    'Abril/2022',
    'Maio/2022',
    'Junho/2022',
    'Julho/2022',
    'Agosto/2022',
    'Setembro/2022',
    'Outubro/2022',
    'Novembro/2022',
    'Dezembro/2022'
  ];

  valores = [
    7154.54
  ];

  grafico: Grafico[];
  openNavbar: boolean;

  constructor(public graficoService: GraficoService,
    private userService: UserService,
    private router: Router) { }


  ngOnInit() {
    this.graficoService.getDados().subscribe((res) => {
      this.grafico = res as Grafico[];
    });

    console.log(this.listarValores());
  }

  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: this.valores, label: 'Valor em R$' },
  ];

  public chartLabels: Array<any> = this.mes;

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  cadastrarValoresMensais(): void {
    this.router.navigate(['/valores-mensais']);
  }

  listarValores() {
    let array: Array<any> = [];
    for (let valores of this.grafico) {
      array.push({
        Valor: valores.valor
      });
    }
    return array;
  }

  showNavbar(): void {
    this.openNavbar = !this.openNavbar;
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
