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
} from '@/components/ui/sidebar';
import { LogOutIcon, PlusIcon, Settings2, User2 } from 'lucide-react';
import Link from 'next/link';
import { SIDEBAR_GROUPS } from '@/lib/ui/sidebar';

export default function AppSidebar() {
  return (
    <section>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>Articles Shelf</SidebarHeader>
          <SidebarContent>
            {SIDEBAR_GROUPS.map((grp, index) => (
              <SidebarGroup id={grp.name + index}>
                <SidebarGroupLabel>{grp.name}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {grp.menu.map((item) => (
                      <SidebarMenuItem>
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
    </section>
  );
}
