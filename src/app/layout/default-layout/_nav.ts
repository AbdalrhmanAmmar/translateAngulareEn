import { INavData } from '@coreui/angular-pro';
import { Roles } from '../../../core/interfaces/iauth';

export const navItems: INavData[] = [
  {
    name: 'NAVIGATION.HOME',
    url: '/home',
    iconComponent: { name: 'cilHome' },
  },
  {
    attributes: {
      Roles: [Roles.MedRep, Roles.MedSup, Roles.SalesRep, Roles.SalesSup, Roles.Admin],
    },
    name: 'NAVIGATION.DASHBOARDS',
    url: '/dashboards',
    iconComponent: { name: 'cilChartLine' },
    children: [
      {
        name: 'NAVIGATION.CLINICS_DASHBOARD',
        url: '/dashboards/clinics',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.MedRep, Roles.MedSup, Roles.Admin],
        },
      },
        {
        name: 'NAVIGATION.PHARMACIES_DASHBOARD',
        url: '/dashboards/pharmacies',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.SalesRep, Roles.SalesSup, Roles.Admin],
        },
      },
    ],
  },
  {
    attributes: {
      Roles: [Roles.MedRep, Roles.MedSup, Roles.SalesRep, Roles.SalesSup,Roles.Admin],
    },
    name: 'NAVIGATION.REPORTS',
    url: '/reports',
    iconComponent: { name: 'cilChartPie' },
    children: [
      {
        name: 'NAVIGATION.CLINICS_REPORT',
        url: '/reports/clinics',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.MedRep, Roles.MedSup, Roles.Admin],
        },
      },
      {
        name: 'NAVIGATION.PHARMACIES_REPORT',
        url: '/reports/pharmacies',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.SalesRep, Roles.SalesSup, Roles.Admin],
        },
      },
    ],
  },
  {
    attributes: {
      Roles: [Roles.MedRep, Roles.MedSup, Roles.SalesRep, Roles.SalesSup],
    },
    name: 'NAVIGATION.VISITS',
    url: '/visits',
    iconComponent: { name: 'cilLocationPin' },
    children: [
      {
        name: 'NAVIGATION.ADD_CLINIC_VISIT',
        url: '/visits/clinics/add',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.MedRep, Roles.MedSup,],
        },
      },
        {
        name: 'NAVIGATION.ADD_PHARMACY_VISIT',
        url: '/visits/pharmacies/add',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.SalesRep, Roles.SalesSup],
        },
      },
    ],
  },
   {
    attributes: {
      Roles: [Roles.MedRep, Roles.MedSup],
    },
    name: 'NAVIGATION.REQUESTS',
    url: '/requests',
    iconComponent: { name: 'cilPlus' },
    children: [
      {
        name: 'NAVIGATION.SAMPLE_REQUEST',
        url: '/requests/samples/add',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.MedRep, Roles.MedSup],
        },
      },
         {
        name: 'NAVIGATION.SALES_REQUEST',
        url: '/requests/sales/add',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.MedRep, Roles.MedSup],
        },
      },
      {
        name: 'NAVIGATION.MANAGE_REQUESTS',
        url: '/requests/manage',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.MedRep, Roles.MedSup],
        },
      },
    ],
  },
   {
    attributes: {
      Roles: [Roles.OrdersOfficer, Roles.FinancialOfficer],
    },
    name: 'NAVIGATION.COLLECTIONS',
    url: '/collections',
    iconComponent: { name: 'cilHandshake' },
    children: [
      {
        name: 'NAVIGATION.PAYMENT_COLLECTION',
        url: '/collections/payments/add',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.FinancialOfficer],
        },
      },
         {
        name: 'NAVIGATION.ORDER_COLLECTION',
        url: '/collections/orders/add',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.OrdersOfficer],
        },
      },
    ],
  },
    {
    attributes: {
      Roles: [Roles.MedSup],
    },
    name: 'NAVIGATION.RATINGS',
    url: '/rates',
    iconComponent: { name: 'cilStar' },
    children: [
      {
        name: 'NAVIGATION.RATE_VISITS_REP',
        url: '/rates/visits-rep/add',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.MedSup],
        },
      },
    ],
  },
   {
    attributes: {
      Roles: [Roles.Admin],
    },
    name: 'NAVIGATION.GENERAL_MANAGEMENT',
    url: '/general-management',
    iconComponent: { name: 'cilAppsSettings' },
    children: [
      {
        name: 'NAVIGATION.WORK_DAYS',
        url: '/general-management/work-days',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.Admin],
        },
      },
      {
        name: 'NAVIGATION.SHEETS',
        url: '/general-management/sheets',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.Admin],
        },
      },
      {
        name: 'NAVIGATION.LOST_ORDERS',
        url: '/general-management/lost-orders',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.Admin],
        },
      },
    ],
  },
  {
    attributes: {
      Roles: [Roles.Admin],
    },
    name: 'NAVIGATION.USER_MANAGEMENT',
    url: '/user-management',
    iconComponent: { name: 'cilPeople' },
    children: [
      {
        name: 'NAVIGATION.ADD_USER',
        url: '/user-management/add',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.Admin],
        },
      },
    ],
  },
];
