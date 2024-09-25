import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

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

  constructor(private http: HttpClient) {
  }

  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/budget')
      .subscribe((res: any) => {
        for (let i = 0; i < res.myBudget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;
        }
        this.createChart();
      });
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
