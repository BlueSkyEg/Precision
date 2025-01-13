import { SideNavElements } from '../interfaces/side-nav/side-nav-elements';
export function getNavBarData(userRole: string): SideNavElements[] {
  const navBarData: SideNavElements[] = [
    {
      name: 'Insights',
      expanded: false,
      children: [
        {
          name: 'Dashboard',
          route: 'insights/dashboard',
          icon: 'dashboard',
          expanded: false,
          children: [
            {
              name: 'Admin Dashboard',
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
          expanded: false,
          children: [
            {
              name: 'QuickBooks',
              route: 'insights/documents/quick-books',
            },
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
          name: 'Subcontractors',
          icon: 'Subcontractors',
          route: 'insights/subcontractors',
        },
        {
          name: 'Tax Return History',
          icon: 'Tax Return History',
          route: 'insights/tax-return-history',
        },
      ],
    },

    {
      name: 'Communications',
      expanded: false,
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
      expanded: false,
      children: [
        {
          name: 'Dashboard ',
          icon: 'dashboard',
        },
      ],
    },
  ];
  if (userRole === 'ACCOUNTANT') {
    navBarData.forEach((item) => {
      if (item.name === 'Insights') {
        item.children?.forEach((child) => {
          // Check if the child has its own "children" and filter "Admin Dashboard"
          if (child.name === 'Dashboard' && child.children) {
            // Remove "Admin Dashboard"
            child.children = child.children.filter(
              (subChild) => subChild.name !== 'Admin Dashboard'
            );

            // Change name of "Accountant Dashboard" to "My Dashboard"
            const accountantDashboard = child.children.find(
              (subChild) => subChild.name === 'Accountant Dashboard'
            );
            if (accountantDashboard) {
              accountantDashboard.name = 'My Dashboard';
            }

            // Move "My Dashboard" to the first position and "Client Dashboard" to the second
            const clientDashboardIndex = child.children.findIndex(
              (subChild) => subChild.name === 'Client Dashboard'
            );
            const accountantDashboardIndex = child.children.findIndex(
              (subChild) => subChild.name === 'My Dashboard'
            );

            // If the "Client Dashboard" is found, move it to second place after "My Dashboard"
            if (clientDashboardIndex > -1) {
              const clientDashboard = child.children.splice(
                clientDashboardIndex,
                1
              )[0];
              child.children.splice(
                accountantDashboardIndex + 1,
                0,
                clientDashboard
              );
            }
          }
        });
      }
    });
  }
  else if (userRole === 'CLIENT') {
    navBarData.forEach((item) => {
      if (item.name === 'Insights') {
                item.children = item.children?.filter((child) => {
                  return ![
                    'Documents',
                    'Balance Sheet',
                    'Profit & Loss',
                    'Tax Return History',
                  ].includes(child.name);
                });

        item.children?.forEach((child) => {
          if (child.name === 'Dashboard' && child.children) {
            child.name = 'My Dashboard';
            child.children = [];
          }
        });
      }
    });
  }

  return navBarData;
}
