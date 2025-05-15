'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, List, Settings } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Transactions', href: '/transactions', icon: List },
  { name: 'Settings', href: '/settings?panel=sources', icon: Settings },
];

export default function BottomNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center border-t border-border md:hidden h-14 bg-white">
      {navItems.map(({ name, href, icon: Icon }) => {
        const isActive = pathname === href || pathname.startsWith(href.split('?')[0]);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex flex-col items-center justify-center text-xs transition px-2 h-full border-t-2',
              isActive
                ? 'text-foreground font-semibold border-primary'
                : 'text-muted-foreground hover:text-foreground border-transparent'
            )}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span>{name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
