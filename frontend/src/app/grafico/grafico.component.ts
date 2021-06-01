import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grafico } from '../model/grafico-model';
import { GraficoService } from '../service/grafico.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss'],
  providers: [GraficoService]
})
export class GraficoComponent implements OnInit {

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

  valores = [
    5535.16,
    5029.54,
    4878.50,
    5606.24,
    5556.71
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
