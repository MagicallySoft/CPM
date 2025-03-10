const menuItems = {
    items: [
      {
        id: 'navigation',
        title: 'Navigation',
        type: 'group',
        icon: 'icon-navigation',
        children: [
          {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            icon: 'feather icon-home',
            url: '/',
            allowedRoles: ['admin', 'employee', 'superadmin', 'subadmin'],
          }
        ]
      },
      {
        id: 'ui-customer',
        title: 'CUSTOMER ELEMENT', //UI ELEMENT
        type: 'group',
        icon: 'icon-ui',
        children: [
          {
            id: 'customer',
            title: 'Customer',
            type: 'collapse',
            icon: 'feather icon-box',
            children: [
              {
                id: 'customer-list',
                title: 'Customer List',
                type: 'item',
                url: '/customerlist',
                allowedRoles: ['admin', 'employee', 'superadmin', 'subadmin'],
              },
              {
                id: 'customer-reminder',
                title: 'Reminder',
                type: 'item',
                url: '/reminder',
                allowedRoles: ['admin', 'employee', 'superadmin', 'subadmin'],
              },
              {
                id: 'add-customer',
                title: 'Add Customer',
                type: 'item',
                url: '/addcustomer',
                allowedRoles: ['admin', 'superadmin', 'subadmin'],
              },
              {
                id: 'custom-form',
                title: 'Custom Form',
                type: 'item',
                url: '/adminform',
                allowedRoles: ['admin'],
              },
            ]
          }
        ]
      },
      {
        id: 'ui-forms',
        title: 'FORMS & TABLES',
        type: 'group',
        icon: 'icon-group',
        children: [
          {
            id: 'forms',
            title: 'Form Elements',
            type: 'item',
            icon: 'feather icon-file-text',
            url: '/forms/form-basic'
          },
          {
            id: 'table',
            title: 'Table',
            type: 'item',
            icon: 'feather icon-server',
            url: '/tables/bootstrap'
          }
        ]
      },
      {
        id: 'chart-maps',
        title: 'Chart & Maps',
        type: 'group',
        icon: 'icon-charts',
        children: [
          {
            id: 'charts',
            title: 'Charts',
            type: 'item',
            icon: 'feather icon-pie-chart',
            url: '/charts/nvd3'
          },
          {
            id: 'maps',
            title: 'Maps',
            type: 'item',
            icon: 'feather icon-map',
            url: '/maps/google-map'
          }
        ]
      },
      {
        id: 'pages',
        title: 'Pages',
        type: 'group',
        icon: 'icon-pages',
        children: [
          {
            id: 'auth',
            title: 'Authentication',
            type: 'collapse',
            icon: 'feather icon-lock',
            badge: {
              title: 'New',
              type: 'label-danger'
            },
            children: [
              {
                id: 'signup-1',
                title: 'Sign up',
                type: 'item',
                url: '/auth/signup-1',
                target: true,
                breadcrumbs: false
              },
              {
                id: 'signin-1',
                title: 'Sign in',
                type: 'item',
                url: '/auth/signin-1',
                target: true,
                breadcrumbs: false
              }
            ]
          },
          {
            id: 'sample-page',
            title: 'Sample Page',
            type: 'item',
            url: '/sample-page',
            classes: 'nav-item',
            icon: 'feather icon-sidebar'
          },
          {
            id: 'documentation',
            title: 'Documentation',
            type: 'item',
            icon: 'feather icon-book',
            classes: 'nav-item',
            // url: 'https://codedthemes.gitbook.io/datta/',
            target: true,
            external: true
          },
          {
            id: 'menu-level',
            title: 'Menu Levels',
            type: 'collapse',
            icon: 'feather icon-menu',
            children: [
              {
                id: 'menu-level-1.1',
                title: 'Menu Level 1.1',
                type: 'item',
                url: '#!'
              },
              {
                id: 'menu-level-1.2',
                title: 'Menu Level 2.2',
                type: 'collapse',
                children: [
                  {
                    id: 'menu-level-2.1',
                    title: 'Menu Level 2.1',
                    type: 'item',
                    url: '#'
                  },
                  {
                    id: 'menu-level-2.2',
                    title: 'Menu Level 2.2',
                    type: 'collapse',
                    children: [
                      {
                        id: 'menu-level-3.1',
                        title: 'Menu Level 3.1',
                        type: 'item',
                        url: '#'
                      },
                      {
                        id: 'menu-level-3.2',
                        title: 'Menu Level 3.2',
                        type: 'item',
                        url: '#'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          // {
          //   id: 'logout',
          //   title: 'Logout',
          //   type: 'item',
          //   url: '#',
          //   classes: 'nav-item dud-logout',
          //   icon: 'feather icon-log-out',
          // }
        ]
      }
    ]
  };
  
  export default menuItems;