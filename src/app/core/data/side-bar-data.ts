import { SideNavElements } from '../interfaces/side-nav-elements';
export const TREE_DATA: SideNavElements[] = [
  {
    name: 'Insights',
    children: [
      {
        name: 'Dashboard',
        route: 'insights/dashboard',
        icon: 'dashboard',
        children: [
          {
            name: 'Admin Dashboard ',
            route: 'insights/dashboard/admin-dashboard',
          },
          {
            name: 'Client Dashboard',
            route: 'insights/dashboard/client-dashboard',
          },
          {
            name: 'Accountant Dashboard',
            route: 'insights/dashboard/accountant-dashboard',
          },
        ],
      },
      {
        name: 'Transactions',
        icon: 'Transactions',
        route: 'insights/transactions',
      },
      { name: 'Balance Sheet', icon: 'Balance Sheet' },
      { name: 'Profit & Loss', icon: 'ProfitAndLoss' },
      {
        name: 'Documents',
        icon: 'Documents',
        children: [
          { name: 'Request Document' },
          { name: 'Documents Dashboard' },
        ],
      },
      { name: 'Subcontractors ', icon: 'Subcontractors' },
      { name: 'Tax Return History ', icon: 'Tax Return History' },
    ],
  },
  {
    name: 'Communications',
    children: [
      {
        name: 'Dashboard ',
        icon: 'dashboard',
      },
      {
        name: 'Tickets ',
        icon: 'Tickets',
      },
    ],
  },
  {
    name: 'Workflow',
    children: [
      {
        name: 'Dashboard ',
        icon: 'dashboard',
      },
    ],
  },
];
