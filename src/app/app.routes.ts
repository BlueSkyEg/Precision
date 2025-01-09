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
import { BalanceSheetComponent } from './features/insights/balance-sheet/balance-sheet.component';
import { ProfitLossComponent } from './features/insights/profit-loss/profit-loss.component';
import { RequestDocumentsComponent } from './features/insights/documents/request-documents/request-documents.component';
import { DocumentsDashboardComponent } from './features/insights/documents/documents-dashboard/documents-dashboard.component';
import { SubcontractorsComponent } from './features/insights/subcontractors/subcontractors.component';
import { TaxReturnHistoryComponent } from './features/insights/tax-return-history/tax-return-history.component';
import { SettingsComponent } from './features/settings/settings.component';
import { ProfileComponent } from './features/insights/profile/profile.component';
import { ProfileSettingsComponent } from './features/insights/profile/profile-settings/profile-settings.component';
import { SubProfilesComponent } from './features/insights/profile/sub-profiles/sub-profiles.component';
import { EditProfileComponent } from './features/insights/profile/profile-settings/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './features/insights/profile/profile-settings/change-password/change-password.component';
import { DocumentsComponent } from './features/insights/documents/documents.component';
import { QuickBooksComponent } from './features/insights/documents/quick-books/quick-books.component';


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
          { path: 'transactions', component: TransactionsComponent },
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
          { path: 'balance-sheet', component: BalanceSheetComponent },
          { path: 'profit-loos', component: ProfitLossComponent },

          {
            path: 'documents',
            component: DocumentsComponent,
            children: [
              {
                path: 'quick-books',
                component: QuickBooksComponent,
              },
              {
                path: 'request-document',
                component: RequestDocumentsComponent,
              },
              {
                path: 'document-dashboard',
                component: DocumentsDashboardComponent,
              },
              { path: '', redirectTo: 'quick-books', pathMatch: 'full' },
            ],
          },
          { path: 'subcontractors', component: SubcontractorsComponent },
          { path: 'tax-return-history', component: TaxReturnHistoryComponent },
          { path: 'settings', component: SettingsComponent },
          {
            path: 'profile', component: ProfileComponent, children: [
              {
                path: 'profile-settings', component: ProfileSettingsComponent,
                children: [
                  { path: 'profile-edits', component: EditProfileComponent },
                  { path: 'change-password', component: ChangePasswordComponent },
                  { path: '', redirectTo: 'profile-edits', pathMatch: 'full' },
                ]
              },
              { path: 'sub-profiles', component: SubProfilesComponent },
              { path: '', redirectTo: 'profile-settings', pathMatch: 'full' },

            ]
          },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ],
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
