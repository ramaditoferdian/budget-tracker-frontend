import * as Phosphor from "phosphor-react";
import { IconProps } from "phosphor-react";
import { isValidElementType } from "react-is";

// Ambil semua ikon dari Phosphor dan cast ke Record
const PhosphorIcons = Phosphor as Record<string, unknown>;

console.log(Phosphor)

// Filter hanya nama ikon yang valid dan pastikan itu adalah komponen React
export const phosphorIconNames = Object.keys(PhosphorIcons).filter((name) => {
  const Icon = PhosphorIcons[name];

  // Pastikan tidak mengambil IconContext dan objek non-komponen
  if (name === "IconContext") return false;

  // Memastikan bahwa hanya komponen React yang valid yang terambil
  return isValidElementType(Icon) && /^[A-Z]/.test(name);
}) as Array<keyof typeof Phosphor>;

// Tipe nama ikon yang valid
export type PhosphorIconName = (typeof phosphorIconNames)[number];

// Fungsi untuk mendapatkan ikon berdasarkan nama
export function getPhosphorIcon(name: PhosphorIconName): React.FC<IconProps> {
  const Icon = PhosphorIcons[name];
  if (isValidElementType(Icon)) {
    return Icon as React.FC<IconProps>;
  }

  // Jika tidak ada ikon yang valid, kembalikan ikon default
  const DefaultIcon = PhosphorIcons["Wallet"];
  return isValidElementType(DefaultIcon)
    ? (DefaultIcon as React.FC<IconProps>)
    : () => null;
}
