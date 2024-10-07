import { SideNavElements } from '../interfaces/side-nav-elements';
export const TREE_DATA: SideNavElements[] = [
  {
    name: 'Insights',
    children: [
      {
        name: 'Dashboard',
        icon: 'dashboard',
        children: [
          { name: 'Admin Dashboard ' },
          { name: 'Client Dashboard' },
          { name: 'Accountant Dashboard' },
        ],
      },
      { name: 'Transactions', icon: 'Transactions' },
      { name: 'Balance Sheet', icon: 'Balance Sheet' },
      { name: 'Profit & Loss', icon: 'ProfitAndLoss' },
      {
        name: 'Documents',
        icon:'Documents',
        children: [
          { name: 'Request Document', icon: 'request_page' },
          { name: 'Documents Dashboard', icon: 'dashboard' },
        ],
      },
      { name: 'Subcontractors ', icon: 'group' },
      { name: 'Tax Return History ', icon: 'history' },
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
        icon: 'ballot',
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
      {
        name: 'Tickets ',
        icon: 'ballot',
      },
    ],
  },
];
