import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { DespesaService } from '../despesa.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
      display: false,      
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'bar';
  public pieChartLegend = true;
  
  public pieChartColors = [
    {
      backgroundColor: ['#3e95cd','#3e95cd','#3e95cd','#3e95cd','#3e95cd','#3e95cd','#3e95cd','#3e95cd','#3e95cd','#3e95cd','#3e95cd','#3e95cd'],
    },
  ];


  constructor(private _despesaService: DespesaService) { }

  ngOnInit() {
    this._despesaService.getDespesas().subscribe(despesas =>{
      let meses: Array<number>= new Array<number>(12).fill(0);
      despesas.forEach((d)=>{
        let moth: number = new Date(d.data).getMonth();
        meses[moth] = meses[moth] + d.valor;        
      })           
      this.pieChartData = meses;
    })
    
  }

}
