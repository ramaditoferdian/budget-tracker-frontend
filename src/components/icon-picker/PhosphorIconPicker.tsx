import { phosphorIconNames, getPhosphorIcon } from "@/lib/getPhosphorIcon";
import { useIconStore } from "@/stores/useIconStore";

export default function PhosphorIconPicker() {
  const { selectedIcon, setSelectedIcon, iconColor } = useIconStore();

  return (
    <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto border rounded p-2">
      {phosphorIconNames.length === 0 && (
        <p className="text-sm text-gray-400 col-span-full text-center">No icons available.</p>
      )}

      {phosphorIconNames.map((name) => {
        const Icon = getPhosphorIcon(name);
        if (!Icon) return null;

        return (
          <button
            key={name}
            onClick={() => setSelectedIcon(name)}
            aria-label={`Choose icon ${name}`}
            className={`p-2 rounded-xl border-2 transition-colors ${
              selectedIcon === name
                ? "bg-blue-100 border-blue-500"
                : "hover:bg-gray-100 border-transparent"
            }`}
          >
            <Icon
              size={24}
              color={iconColor}
              weight={selectedIcon === name ? "fill" : "regular"}
            />
          </button>
        );
      })}
    </div>
  );
}
