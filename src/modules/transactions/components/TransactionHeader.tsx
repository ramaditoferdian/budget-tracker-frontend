'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTransactionFilters } from '@/modules/transactions/hooks/useTransactionFilters';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  onAddClick: () => void;
}

const TransactionsHeader: React.FC<Props> = ({ onAddClick }) => {
  const {
    typeId,
    setTypeId,
    categoryId,
    setCategoryId,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
  } = useTransactionFilters();

  // Convert store string date ke Date object (biar bisa dipake di DatePicker)
  const initialStart = startDate ? new Date(startDate) : null;
  const initialEnd = endDate ? new Date(endDate) : null;

  const [range, setRange] = useState<[Date | null, Date | null]>([initialStart, initialEnd]);

  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setRange(dates);

    if (start) setStartDate(start.toISOString().split('T')[0]);
    if (end) setEndDate(end.toISOString().split('T')[0]);
  };

  // Keep local range in sync if store changes (ex: reset filter)
  useEffect(() => {
    setRange([
      startDate ? new Date(startDate) : null,
      endDate ? new Date(endDate) : null,
    ]);
  }, [startDate, endDate]);

  return (
    <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
      <div className="flex gap-2 flex-wrap items-center">
        <Select onValueChange={setTypeId} defaultValue={typeId}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Pilih Tipe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Pemasukan</SelectItem>
            <SelectItem value="2">Pengeluaran</SelectItem>
            <SelectItem value="3">Transfer</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setCategoryId} defaultValue={categoryId}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Pilih Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Makanan</SelectItem>
            <SelectItem value="2">Transportasi</SelectItem>
            <SelectItem value="3">Gaji</SelectItem>
          </SelectContent>
        </Select>

        {/* Inline Date Range Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-64 justify-start text-left">
              {startDate && endDate
                ? `${format(new Date(startDate), 'dd MMM yyyy')} - ${format(new Date(endDate), 'dd MMM yyyy')}`
                : 'Pilih Rentang Tanggal'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <DatePicker
              selected={range[0]}
              onChange={handleDateRangeChange}
              startDate={range[0]}
              endDate={range[1]}
              selectsRange
              inline
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button onClick={onAddClick}>+ Tambah Transaksi</Button>
    </div>
  );
};

export default TransactionsHeader;
