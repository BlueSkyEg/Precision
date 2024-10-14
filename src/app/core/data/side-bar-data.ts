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
      {
        name: 'Balance Sheet',
        icon: 'Balance Sheet',
        route: 'insights/balance-sheet',
      },
      {
        name: 'Profit & Loss',
        icon: 'ProfitAndLoss',
        route: 'insights/profit-loos',
      },
      {
        name: 'Documents',
        icon: 'Documents',
        route: 'insights/documents',

        children: [
          {
            name: 'Request Document',
            route: 'insights/documents/request-document',
          },
          {
            name: 'Documents Dashboard',
            route: 'insights/documents/document-dashboard',
          },
        ],
      },
      {
        name: 'Subcontractors ',
        icon: 'Subcontractors',
        route: 'insights/subcontractors',
      },
      {
        name: 'Tax Return History ',
        icon: 'Tax Return History',
        route: 'insights/tax-return-history',
      },
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
export const TREE_DATA_ICONS: SideNavElements[] = [
  {
    name:'Dashboard',
    route: 'insights/dashboard',
    icon: 'dashboard',
    // children: [
    //   {
    //     name: 'Admin Dashboard ',
    //     route: 'insights/dashboard/admin-dashboard',
    //   },
    //   {
    //     name: 'Client Dashboard',
    //     route: 'insights/dashboard/client-dashboard',
    //   },
    //   {
    //     name: 'Accountant Dashboard',
    //     route: 'insights/dashboard/accountant-dashboard',
    //   },
    // ],
  },
  {
    name: 'Transactions',
    icon: 'Transactions',
    route: 'insights/transactions',
  },
  {
    name: 'Balance Sheet',
    icon: 'Balance Sheet',
    route: 'insights/balance-sheet',
  },
  {
    name: 'ProfitAndLoss',
    icon: 'ProfitAndLoss',
    route: 'insights/profit-loos',
  },
  {
    name: 'Documents',
    icon: 'Documents',
    route: 'insights/documents',

    // children: [
    //   {
    //     name: 'Request Document',
    //     route: 'insights/documents/request-document',
    //   },
    //   {
    //     name: 'Documents Dashboard',
    //     route: 'insights/documents/document-dashboard',
    //   },
    // ],
  },
  {
    name: 'Subcontractors',
    icon: 'Subcontractors',
    route: 'insights/subcontractors',
  },
  {
    name: 'Tax Return History',
    icon: 'Tax Return History',
    route: 'insights/tax-return-history',
  },

  {
    name: 'Dashboard ',
    icon: 'dashboard',
  },
  {
    name: 'Tickets ',
    icon: 'Tickets',
  },

  {
    name: 'Dashboard ',
    icon: 'dashboard',
  },
];
