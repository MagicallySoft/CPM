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
                allowedRoles: ['admin', 'employee', 'superadmin', 'subadmin'],
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
        id: 'ui-registerCode',
        title: 'REGISTRETION CODE', //UI ELEMENT
        type: 'group',
        icon: 'icon-ui',
        allowedRoles: ['admin'],
        children: [
          {
            id: 'registretioncode',
            title: 'Registretion Code',
            type: 'item',
            icon: 'feather icon-box',
            // allowedRoles: ['admin'],
          }
        ]
      },
    ]
  };
  
  export default menuItems;