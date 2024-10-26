import { HomeIcon, Settings2, User2, FolderPlusIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

interface SidebarGroupMenu {
  Icon: any;
  title: string;
  variant?: 'outline' | 'default' | null;
  action: {
    href: string;
  };
}
interface SidebarGroupData {
  name: string;
  menu: SidebarGroupMenu[];
}

export const SIDEBAR_GROUPS: SidebarGroupData[] = [
  {
    name: 'Application',
    menu: [
      {
        Icon: HomeIcon,
        title: 'Home',
        action: { href: '/portal' },
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
