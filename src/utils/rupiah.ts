// src/utils/rupiah.ts

export function formatRupiah(value: string): string {
  const number = parseRupiah(value)
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number)
}

export function parseRupiah(value: string): number {
  const clean = value.replace(/[^\d]/g, '') // buang semua selain angka
  return parseInt(clean || '0', 10)
}
