'use client';

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import BottomNavbar from "./BottomNavbar";

const menuItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Transactions", href: "/transactions" },
  {
    name: "Settings",
    href: "/settings", // Parent route for settings
    children: [
      { name: "Sources", query: "panel=sources" },
      { name: "Transaction Type", query: "panel=transaction-type" },
      { name: "Category", query: "panel=category" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams(); // Get current search params

  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  // Toggle accordion
  const toggleAccordion = (panel: string) => {
    setOpenAccordion((prev) => (prev === panel ? null : panel));
  };

  return (
    <>
      <aside className="hidden md:block w-56 h-screen border-r border-border bg-background p-4">
        <div className="text-lg font-medium mb-6 tracking-tight">BudgetTracker</div>

        <nav className="flex flex-col gap-1 w-full">
          {menuItems.map((item) => {
            // Check if the item has children (for Settings)
            if (item.children) {
              return (
                <div key={item.href}>
                  <div
                    className={cn(
                      "text-sm px-3 py-2 rounded-md transition hover:bg-muted hover:text-foreground w-full hover:cursor-pointer flex items-center justify-between",
                      pathname === item.href ? "bg-muted text-foreground font-medium" : "text-muted-foreground"
                    )}
                    onClick={() => toggleAccordion("settings")}
                  >
                    {item.name}

                    {openAccordion !== "settings" ? (
                      <ChevronDown className="w-4 h-4" />
                    )
                      : (
                        <ChevronUp className="w-4 h-4" />
                    )}
                  </div>
                  {/* Accordion - Children */}
                  {openAccordion === "settings" && (
                    <div className="ml-4 mt-2 space-y-1 flex flex-col w-full">
                      {item.children.map((child) => {
                        const isActive = searchParams.get("panel") === child.query.split("=")[1]; // Active when query param matches
                        return (
                          <Link
                            key={child.query}
                            href={`${item.href}?${child.query}`}
                            className={cn(
                              "text-sm px-3 py-2 rounded-md transition hover:bg-muted hover:text-foreground w-full",
                              isActive ? "bg-muted text-foreground font-medium" : "text-muted-foreground"
                            )}
                          >
                            {child.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            // Render regular menu items
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm px-3 py-2 rounded-md transition hover:bg-muted hover:text-foreground w-full",
                  pathname === item.href ? "bg-muted text-foreground font-medium" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Bottom Navbar */}
      <BottomNavbar />
    </>
  );
}
