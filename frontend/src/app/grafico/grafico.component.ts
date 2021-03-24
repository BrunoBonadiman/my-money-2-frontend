import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GraficoService } from '../service/grafico.service';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss'],
  providers: [GraficoService]
})
export class GraficoComponent {

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

  constructor( public graficoService: GraficoService,
    private router: Router) { }

  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: [5535.16, 5029.54, 4865.86], label: 'Valor em R$' },
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

  cadastrarValoresMensais():void{
    this.router.navigate(['/valores-mensais']);
  }
}
