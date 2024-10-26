import React, { useState } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarMenu,
  SidebarGroupContent,
  SidebarMenuAction,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { LogOutIcon, FolderPlusIcon } from 'lucide-react';
import Link from 'next/link';
import { SIDEBAR_GROUPS } from '@/lib/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>Articles Shelf</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Actions</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/portal/folder/create">
                    <FolderPlusIcon />
                    New Folder
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          {SIDEBAR_GROUPS.map((grp, index) => (
            <SidebarGroup id={grp.name + index}>
              <SidebarGroupLabel>{grp.name}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {grp.menu.map((item, index) => (
                    <SidebarMenuItem
                      id={index + item.title + Math.random().toString(6)}
                    >
                      <SidebarMenuButton
                        variant={
                          item.variant as
                            | 'outline'
                            | 'default'
                            | null
                            | undefined
                        }
                        asChild
                      >
                        <Link href={item.action.href}>
                          <item.Icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenuButton variant="outline">
            <LogOutIcon className="text-red-600" />
            <span>Logout</span>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
