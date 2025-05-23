'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTransactionTypes } from '@/modules/transactionTypes/hooks/useTransactionTypes';
import { useCategories } from '@/modules/categories/hooks/useCategories';
import { Calendar1, Check, ChevronsUpDown, Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // pastikan ada cn helper
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useRouter, useSearchParams } from 'next/navigation';
import { isValidDateParam } from '@/utils/validate';

interface TransactionFiltersProps {
  onSubmit: (filters: {
    typeId: string;
    categoryId: string;
    startDate: string | null;
    endDate: string | null;
  }) => void;
  onReset: () => void;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({ onSubmit, onReset }) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const startDate = searchParams.get('start_date');
  const endDate = searchParams.get('end_date');

  const [filters, setFilters] = useState({
    typeId: '',
    categoryId: '',
    startDate: '',
    endDate: '',
  });

  const { data: transactionTypeData, isLoading: isLoadingTypes } = useTransactionTypes();
  const { data: categoryData, isLoading: isLoadingCategories } = useCategories({
    transactionTypeId: filters.typeId,
  });

  const [range, setRange] = useState<[Date | null, Date | null]>([
    new Date(filters.startDate),
    new Date(filters.endDate),
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  const isCategoryDisabled = !filters.typeId || filters.typeId === 'transfer-type';

  const updateFilters = (updated: Partial<typeof filters>) => {
    setFilters((prev) => {
      const newFilters = { ...prev, ...updated };
      onSubmit(newFilters);
      return newFilters;
    });
  };

  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setRange(dates);
    updateFilters({
      startDate: start ? start.toISOString().split('T')[0] : undefined,
      endDate: end ? end.toISOString().split('T')[0] : undefined,
    });
  };

  const handleReset = () => {
    const resetValues = {
      typeId: '',
      categoryId: '',
      startDate: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
      endDate: format(endOfMonth(new Date()), 'yyyy-MM-dd'),
    };
    setFilters(resetValues);
    setRange([new Date(resetValues.startDate), new Date(resetValues.endDate)]);
    onReset();
    onSubmit(resetValues);
  };

  useEffect(() => {
    if (startDate == null && endDate == null) {
      handleReset();
    }
  }, [startDate, endDate]);

  useEffect(() => {
    const rawStart = searchParams.get('start_date');
    const rawEnd = searchParams.get('end_date');

    const isStartValid = isValidDateParam(rawStart);
    const isEndValid = isValidDateParam(rawEnd);

    if (!isStartValid || !isEndValid) {
      const params = new URLSearchParams(searchParams.toString());

      params.delete('start_date');
      params.delete('end_date');

      const newUrl = `/transactions?${params.toString()}`;
      router.replace(newUrl);
    }
  }, [searchParams, router]);

  useEffect(() => {
    const rawStart = searchParams.get('start_date');
    const rawEnd = searchParams.get('end_date');

    const isStartValid = isValidDateParam(rawStart);
    const isEndValid = isValidDateParam(rawEnd);

    const newParams = new URLSearchParams(searchParams.toString());

    const defaultStart = format(startOfMonth(new Date()), 'yyyy-MM-dd');
    const defaultEnd = format(endOfMonth(new Date()), 'yyyy-MM-dd');

    const startDate = isStartValid && rawStart ? rawStart : defaultStart;
    const endDate = isEndValid && rawEnd ? rawEnd : defaultEnd;

    // Jika ada param tidak valid → hapus dari URL
    if (!isStartValid || !isEndValid) {
      if (!isStartValid) newParams.delete('start_date');
      if (!isEndValid) newParams.delete('end_date');
      router.replace(`/transactions?${newParams.toString()}`);
    }

    // Set filters setelah semua validasi
    setFilters({
      typeId: '',
      categoryId: '',
      startDate,
      endDate,
    });

    setRange([new Date(startDate), new Date(endDate)]);
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-4">
      {/* Baris atas: Filters button + Date Picker */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 px-4 text-sm"
        >
          <Settings2
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
          />
          Filters
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-max min-w-56 justify-start text-sm font-normal">
              {filters.startDate && filters.endDate
                ? `${format(new Date(filters.startDate), 'dd/MM/yyyy')} – ${format(
                    new Date(filters.endDate),
                    'dd/MM/yyyy'
                  )}`
                : 'Select Date Range'}
              <Calendar1 className="ml-2 h-4 w-4" />
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

      {/* Accordion content */}
      <div
        className={cn(
          'transition-all duration-500 ease-in-out overflow-hidden border rounded-md bg-white',
          isOpen ? 'max-h-[500px] opacity-100 scale-100 py-4' : 'max-h-0 opacity-0 scale-95 py-0'
        )}
      >
        <div className="flex flex-wrap gap-4 px-4">
          {/* Type */}
          <Select
            onValueChange={(value) => updateFilters({ typeId: value, categoryId: '' })}
            value={filters.typeId}
          >
            <SelectTrigger className="w-44 text-sm">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              {isLoadingTypes ? (
                <SelectItem value="loading">Loading...</SelectItem>
              ) : (
                transactionTypeData?.data?.map((type) => (
                  <SelectItem className="cursor-pointer" key={type.id} value={type.id.toString()}>
                    {type.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          {/* Category: pake Combobox! */}
          <Popover open={isOpenCategory} onOpenChange={setIsOpenCategory}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={isOpenCategory}
                className="w-44 justify-between text-sm overflow-clip"
                disabled={isCategoryDisabled || isLoadingCategories}
              >
                {filters.categoryId
                  ? categoryData?.data?.find((cat) => cat.id.toString() === filters.categoryId)
                      ?.name
                  : isCategoryDisabled
                    ? '—'
                    : 'Select Category'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-44 max-h-60 overflow-y-auto p-0">
              <Command>
                <CommandInput placeholder="Search category..." />
                <CommandList>
                  {isLoadingCategories ? (
                    <CommandEmpty>Loading...</CommandEmpty>
                  ) : (
                    <>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup className="max-h-40 overflow-y-auto">
                        {categoryData?.data?.map((category) => (
                          <CommandItem
                            key={category.id}
                            value={category.name.toLowerCase()}
                            className="cursor-pointer border border-b-1 border-muted"
                            onSelect={(currentValue) => {
                              const category = categoryData.data?.find(
                                (cat) => cat.name.toLowerCase() === currentValue
                              );

                              updateFilters({ categoryId: category?.id?.toString() || '' });
                              setIsOpenCategory(false);
                            }}
                          >
                            {category.name}
                            <Check
                              className={cn(
                                'ml-auto h-4 w-4',
                                filters.categoryId === category.id.toString()
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Reset */}
          <Button onClick={handleReset} variant="link" className="px-4 text-sm">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;
