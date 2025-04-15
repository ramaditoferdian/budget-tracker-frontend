'use client';

import { useLogout } from "@/modules/auth/hooks/useAuth";
import { useSession } from "@/modules/auth/hooks/useSession";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useSession();
  const userName = user?.email || "User";

  return (
    <nav className="w-full border-b border-border bg-background text-foreground px-4 py-3 flex items-center">

      {/* User section */}
      <div className="flex items-center space-x-4 justify-between w-full md:justify-end">
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage alt={userName} />
            <AvatarFallback>
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-normal text-muted-foreground">{userName}</span>
        </div>

        <button
          onClick={logout}
          className="text-sm px-3 py-1 rounded-md border border-input hover:bg-muted transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
