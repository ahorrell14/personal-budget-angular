import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import * as d3 from 'd3';

Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {

  public dataSource: { datasets: { data: number[], backgroundColor: string[] }[], labels: string[] } = {
    datasets: [
      {
        data: [] as number[],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
        ]
      }
    ],
    labels: [] as string[]
  };

  constructor(private http: HttpClient, private dataService: DataService) {
  }

  ngAfterViewInit(): void {
    this.dataService.getBudgetData().subscribe((data: any[]) => {
      if (data.length) {
        this.dataSource.datasets[0].data = data.map(item => item.budget);
        this.dataSource.labels = data.map(item => item.title);
        this.createChart();
      }
    });
    this.dataService.fetchBudgetData();
  }

  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement | null;
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: this.dataSource,
      });
    }
  }

}
