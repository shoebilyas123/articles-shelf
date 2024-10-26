import { PlusIcon, Settings2, User2 } from 'lucide-react';

export const SIDEBAR_GROUPS = [
  {
    name: 'Actions',
    menu: [
      {
        Icon: PlusIcon,
        title: 'Add New Shelf',
        variant: 'outline',
        action: {
          href: '/portal/shelf/create',
        },
      },
    ],
  },

  {
    name: 'My Account',
    menu: [
      {
        Icon: User2,
        title: 'Profile',
        variant: 'default',
        action: {
          href: '/portal/my-account/profile',
        },
      },
      {
        Icon: Settings2,
        title: 'Settings',
        variant: 'default',
        action: {
          href: '/portal/my-account/settings',
        },
      },
    ],
  },
];
