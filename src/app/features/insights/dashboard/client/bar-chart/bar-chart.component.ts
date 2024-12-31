import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './bar-chart.component.html',
})
export class BarChartComponent {
  title = "GFG";
  basicData = {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    datasets: [
      {
        label: "Orders on Swiggy",
        backgroundColor: "lightgreen",
        data: [150 - (-200), 60 - (-200), 81, 71, 26, 65, 60]
      },
      {
        label: "Orders on Zomato",
        backgroundColor: "pink",
        data: [56, 69, 89, 61, 36, 75, 50]
      },
      {
        label: "Orders on Uber Eats",
        backgroundColor: "gold",
        data: [52, 59, 99, 71, 46, 85, 30]
      },
      {
        label: "Orders on Licious",
        backgroundColor: "skyblue",
        data: [56, 52, 69, 81, 43, 55, 40]
      }
    ]
  };

  StackedOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#black"
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "#black"
        },
        grid: {
          color: "rgba(255,255,255,0.2)"
        }
      },
      y: {
        stacked: true,
        ticks: {
          color: "#black"
        },
        grid: {
          color: "rgba(255,255,255,0.2)"
        },

        min: -200,
        max: 400,

      }
    }
  };
}
