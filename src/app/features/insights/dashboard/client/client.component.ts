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
          label: 'Net Income',
          data: [
            -9500, 11330, 0, 9000, 12000, 13000, 10000, 7000, -4500, 6000,
            10000, -3000,
          ],
          backgroundColor: 'rgba(51, 96, 211, 1)',
          borderColor: 'rgba(51, 96, 211, 1)',
          borderWidth: 1,
          barPercentage: 0.3,
        },
      ],
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          suggestedMin: -4600,
          max: 19000,
          ticks: {
            color: textColorSecondary,
            callback: (value: number) => `${value / 1000}K`,
          },
          grid: {
            display: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            display: false,
          },
        },
      },
    };
  }
}
