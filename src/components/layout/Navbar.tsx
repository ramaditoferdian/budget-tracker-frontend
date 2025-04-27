'use client';

import { useLogout } from '@/modules/auth/hooks/useAuth';
import { useSession } from '@/modules/auth/hooks/useSession';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { User, Wallet } from 'lucide-react';
import { useSources } from '@/modules/sources/hooks/useSources';
import { formatCurrency } from '@/utils/format';

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useSession();
  const userName = user?.email || 'User';

  const { data: sourcesData, isLoading: sourcesIsLoading, isError: sourcesIsError } = useSources();

  // Hitung total balance dari semua sources
  const totalBalance =
    sourcesData?.data.sources?.reduce((acc, source) => acc + (source.balance || 0), 0) || 0;

  return (
    <nav className="w-full border-b border-border bg-background text-foreground px-4 py-3 flex items-center">
      {/* User section */}
      <div className="flex items-center space-x-4 justify-between w-full md:justify-end">
        {/* Popover info for Wallet */}
        <Popover modal>
          <PopoverTrigger asChild>
            <button className="flex items-center text-sm text-muted-foreground hover:text-foreground transition">
              <Wallet className="w-4 h-4 mr-1" />
              Info
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64 text-sm space-y-3" sideOffset={18} align="end">
            {/* Loading, Error, atau Data */}
            {sourcesIsLoading ? (
              <div className="text-center text-muted-foreground">Loading...</div>
            ) : sourcesIsError ? (
              <div className="text-center text-destructive">Gagal memuat data</div>
            ) : (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Saldo</span>
                  <span>{formatCurrency(totalBalance)}</span>
                </div>
                <div className="text-xs text-muted-foreground pt-2">Detail Sumber Dana:</div>
                <div className="space-y-1 max-h-48 overflow-auto pr-2">
                  {sourcesData?.data.sources?.map((source) => (
                    <div key={source.id} className="flex justify-between text-xs">
                      <span>{source.name}</span>
                      <span>{formatCurrency(source.balance)}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </PopoverContent>
        </Popover>

        {/* Avatar & Username - Profile section */}
        <div className="flex items-center space-x-2">
          <Popover modal>
            <PopoverTrigger asChild>
              <button className="focus:outline-none">
                <Avatar className="w-8 h-8 cursor-pointer">
                  <AvatarImage alt={userName} />
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-64 text-sm space-y-3"
              sideOffset={12}
              alignOffset={-12}
              align="end"
            >
              <div className="text-center font-semibold">{userName}</div>

              {/* Logout Button */}
              <div className="mt-2 text-center">
                <button
                  onClick={logout}
                  className="text-sm px-3 py-1 rounded-md border border-input hover:bg-muted transition"
                >
                  Logout
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
}
