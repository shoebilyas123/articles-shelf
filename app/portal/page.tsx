import React from 'react';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarProvider,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { LogOutIcon, PlusIcon, Settings2, User2 } from 'lucide-react';
import Link from 'next/link';
import AppSidebar from '@/components/custom/app-sidebar';
import Folders from '@/components/custom/folders';

const DUMMY_user = {
  name: 'Shoeb Ilyas',
  email: 'shoebilyas123@gmail.com',
};

export default function Page() {
  return (
    <main>
      <div>Search bar and filters here</div>
      <Folders />
    </main>
  );
}
