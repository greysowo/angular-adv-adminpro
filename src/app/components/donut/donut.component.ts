import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent implements OnInit{
  @Input() title = 'Sin titulo';
  @Input('labels') doughnutChartLabels: string[] = [ 'Label1', 'Label2', 'Label3' ];
  @Input() data = [ 350, 450, 100 ];
  
  public doughnutChartData?: ChartData<'doughnut'>;

  ngOnInit(): void {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          data: this.data,
          backgroundColor: ['#9E120E', '#FF5800', '#FFB414']
        },
      ]
    };
  }
}
