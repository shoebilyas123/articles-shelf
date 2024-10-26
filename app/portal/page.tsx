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
import { Input } from '@/components/ui/input';
import { LogOutIcon, PlusIcon, Settings2, User2 } from 'lucide-react';
import Link from 'next/link';
import AppSidebar from '@/components/custom/app-sidebar';
import Folders from '@/components/custom/folders';
import SearchBar from '../forms/search';

const DUMMY_user = {
  name: 'Shoeb Ilyas',
  email: 'shoebilyas123@gmail.com',
};

export default async function Page(props: {
  searchParams?: Promise<{ query?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query;

  return (
    <main>
      <SearchBar />
      <Folders query={query || null} />
    </main>
  );
}
