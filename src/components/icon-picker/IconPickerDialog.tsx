"use client";

import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PhosphorIconName, phosphorIconNames } from "@/lib/getPhosphorIcon";
import { useIconStore } from "@/stores/useIconStore";
import IconRenderer from "./IconRenderer";
import { Input } from "../ui/input";
import ColorPicker from "./ColorPicker";
import IconPreview from "./IconPreview";
import { se } from "date-fns/locale";

const ITEMS_PER_PAGE = 60;

export default function IconPickerDialog() {
  const { selectedIcon, setSelectedIcon, iconColor, setColor } = useIconStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const filteredIcons = useMemo(() => {
    return phosphorIconNames.filter((name) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredIcons.length / ITEMS_PER_PAGE);
  const paginatedIcons = filteredIcons.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleIconSelect = (iconName: PhosphorIconName) => {
    setSelectedIcon(iconName);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          {selectedIcon ? (
            <span className="flex items-center gap-2">
              <IconRenderer
                name={selectedIcon}
                size={24}
                color={iconColor}
                weight="duotone"
              />
              {selectedIcon}
              {"   "}
              -
              <div
                className="w-6 h-6 rounded-full border border-gray-300"
                style={{ backgroundColor: iconColor }}
              />
              {iconColor}
            </span>
          ) : (
            "Pilih Icon"
          )}
        </Button>
      </DialogTrigger>

      <DialogContent
        id="icon-picker"
        className="max-w-[95vw] sm:max-w-4xl h-[90vh] p-4 flex flex-col"
      >
        <DialogHeader>
          <DialogTitle>Icon Picker</DialogTitle>
          <DialogDescription>
            Choose an icon for your category.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
        <ColorPicker color={iconColor} setColor={setColor} />
          <IconPreview />
          <Input
            type="text"
            placeholder="Search icon..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
        </div>

        {/* Konten utama yang scrollable */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-10">
          <div className="border rounded p-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {paginatedIcons.map((iconName) => (
                <button
                  key={iconName}
                  onClick={() => handleIconSelect(iconName)}
                  className={`group relative p-4 w-full rounded-xl border-2 transition-colors ${
                    selectedIcon === iconName
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <IconRenderer
                      name={iconName}
                      size={28}
                      color={iconColor}
                      weight="duotone"
                    />
                    <span className="text-[10px] mt-1 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                      {iconName}
                    </span>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 z-20 hidden group-hover:block bg-black text-white text-[10px] px-2 py-1 rounded shadow whitespace-nowrap">
                    {iconName}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination tetap di bawah, tidak ikut scroll */}
        <div className="border-t pt-4 flex justify-between items-center text-sm flex-wrap gap-2 bg-white">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="space-x-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
