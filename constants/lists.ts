import type { IModule } from '~/types'

// @unocss-include

export const MODULE_LIST: IModule[] = [
  {
    name: 'home',
    icon: 'i-carbon-home',
    path: '/',
  },
  {
    name: 'config',
    icon: 'i-carbon-settings-adjust',
    path: '/config',
    subMenus: [
      {
        name: 'Users',
        icon: 'i-carbon-user-profile-alt',
        path: '/config/users',
      },
      {
        name: 'Clients',
        icon: 'i-carbon-partnership',
        path: '/config/clients',

      },
    ],
  },
  {
    name: 'Notify',
    icon: 'i-carbon-reminder-medical',
    path: '/notify',
    subMenus: [
      {
        name: 'List',
        icon: 'i-carbon-notification',
        path: '/notify/list',

      },
    ],
  },
]
