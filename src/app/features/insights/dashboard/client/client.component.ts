import { Component, OnInit } from '@angular/core';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';
import { TotalTransactionsCardComponent } from 'app/shared/components/total-transactions-card/total-transactions-card.component';
import { ChartModule } from 'primeng/chart';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    TopNavComponent,
    NavigationIconComponent,
    TotalTransactionsCardComponent,
    ChartModule,
    TabViewModule,
  ],
  templateUrl: './client.component.html',
})
export class ClientComponent implements OnInit {
  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Dashboard', routerLink: '/insights/dashboard' },
    { label: 'Client', routerLink: '/insights/dashboard/client-dashboard' },
  ];
  totalIncome: number = 20;
  grossProfit: number = 30;
  totalExpenses: number = 40;
  pending: number = 400;
  awaiting: number = 400;
  basicData: any;
  basicOptions: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const maxYValue = 19000;
    const minYValue = -9500;
    const startValues = [
      -6800, 0, 0, -5800, 0, 0, 10000, 7000, -4500, 6000, 10000, -3000,
    ];

    const endValues = [
      11800, 13000, 14000, 11800, 14000, 15000, 2000, 5000, 9500, 9000, 2000,
      6000,
    ];

    this.basicData = {
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
          label: '',
          data: startValues,
          backgroundColor: 'rgb(51, 96, 211)',
          borderWidth: 0,
          barPercentage: .3,
          categoryPercentage: 1,
        },
        {
          label: '',
          data: endValues,
          backgroundColor: 'rgb(51, 96, 211)',
          borderWidth: 0,
          barPercentage: .3,
          categoryPercentage: 1,
        },
        {
          label: '',
          data: Array(12).fill(minYValue),
          backgroundColor: 'rgba(247, 247, 247, 1)',
          borderWidth: 0,
          barPercentage: 0.3,
        },
        {
          label: '',
          data: Array(12).fill(maxYValue),
          backgroundColor: 'rgba(247, 247, 247, 1)',
          borderWidth: 0,
          barPercentage: 0.3,
        },
      ],
    };

    this.basicOptions = {
      plugins: {
        tooltip: {
          enabled: false,
        },
        legend: {
          labels: {
            color: textColor,
            filter: (legendItem: any) => legendItem.text !== '',
          },
        },
      },
      scales: {
        y: {
          stacked: true,
          beginAtZero: false,
          min: minYValue,
          max: maxYValue,
          ticks: {
            color: textColorSecondary,
            callback: (value: number) => `${value / 1000}K`,
          },
          grid: {
            display: false, // Disable grid lines on y-axis
          },
        },
        x: {
          stacked: true,
          beginAtZero: false,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            display: false,
          },
        },
      },
      interaction: {
        mode: '',
      },
    };
  }
}
