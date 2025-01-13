import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
})
export class BarChartComponent {
  @Input() chartList: number[] = [];
  @Input() barColor: string = '#3360D3';
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.createChart();
  }

  ngOnChanges(): void {
    this.cdr.detectChanges();
  }
  createChart(): void {
    const ctx = document.getElementById('chartList') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            data: this.chartList,
            backgroundColor: this.barColor,
            barThickness: 24,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                return `$${context.raw.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function (value: any) {
                return value >= 0
                  ? `$${value / 1000}K`
                  : `-$${Math.abs(value) / 1000}K`;
              },
            },
          },
        },
      },
    });
  }
}
