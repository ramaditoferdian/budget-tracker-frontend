"use client";

import { useIconStore } from "@/stores/useIconStore";
import IconRenderer from "./IconRenderer";
import { Exam, Export } from "phosphor-react";

export default function IconPreview() {
  const { selectedIcon, iconColor } = useIconStore();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Preview:</span>
      <div className="w-10 h-10 flex items-center justify-center rounded border border-gray-200 bg-white">
        {selectedIcon ? (
          <IconRenderer
            name={selectedIcon}
            size={28}
            color={iconColor}
            weight={"duotone"}
          />
        ) : (
          <span className="text-xs text-muted-foreground">None</span>
        )}
      </div>

    </div>
  );
}
