import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { InsightsComponent } from './features/insights/insights.component';
import { DashboardComponent } from './features/insights/dashboard/dashboard.component';
import { AdminComponent } from './features/insights/dashboard/admin/admin.component';
import { AccountantComponent } from './features/insights/dashboard/accountant/accountant.component';
import { ClientComponent } from './features/insights/dashboard/client/client.component';
import { TransactionsComponent } from './features/insights/transactions/transactions.component';


export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'insights',
        component: InsightsComponent,
        children: [
          {path:'transactions', component: TransactionsComponent},
          {
            path: 'dashboard',
            component: DashboardComponent,
            children: [
              { path: 'admin-dashboard', component: AdminComponent },
              { path: 'client-dashboard', component: ClientComponent },
              { path: 'accountant-dashboard', component: AccountantComponent },
              { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' },
            ],
          },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ],
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
