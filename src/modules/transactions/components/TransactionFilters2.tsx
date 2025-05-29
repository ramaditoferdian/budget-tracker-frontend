'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { format, startOfMonth, endOfMonth, parseISO, set } from 'date-fns';
import { Calendar1, CalendarIcon, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useTransactionTypes } from '@/modules/transactionTypes/hooks/useTransactionTypes';
import { useCategories } from '@/modules/categories/hooks/useCategories';
import { useSources } from '@/modules/sources/hooks/useSources';
import { isValidDateParam } from '@/utils/validate';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface TransactionFiltersProps {
  onSubmit: (filters: {
    typeIds: string[];
    categoryIds: string[];
    sourceIds: string[];
    startDate: string | null;
    endDate: string | null;
  }) => void;
  onReset: () => void;
}

const TransactionFilters2: React.FC<TransactionFiltersProps> = ({ onSubmit, onReset }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [openDatePicker, setOpenDatePicker] = useState(false);

  // Get default dates
  const defaultStartDate = format(startOfMonth(new Date()), 'yyyy-MM-dd');
  const defaultEndDate = format(endOfMonth(new Date()), 'yyyy-MM-dd');

  // Initialize with default values
  const [filters, setFilters] = useState({
    typeIds: [] as string[],
    categoryIds: [] as string[],
    sourceIds: [] as string[],
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  });

  const [draftFilters, setDraftFilters] = useState({
    typeIds: [] as string[],
    categoryIds: [] as string[],
    sourceIds: [] as string[],
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  });

  // Initialize date range state with safe defaults

  const initialStart = searchParams.get('start_date');
  const initialEnd = searchParams.get('end_date');

  const [range, setRange] = useState<[Date | null, Date | null]>(() => [
    initialStart && isValidDateParam(initialStart)
      ? new Date(initialStart)
      : new Date(defaultStartDate),
    initialEnd && isValidDateParam(initialEnd) ? new Date(initialEnd) : new Date(defaultEndDate),
  ]);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Fetch data
  const { data: transactionTypeData, isLoading: isLoadingTypes } = useTransactionTypes();
  const { data: categoryData, isLoading: isLoadingCategories } = useCategories();
  const { data: sourcesData, isLoading: isLoadingSources } = useSources();

  // Count active filters - safely handle null dates
  const activeFilterCount =
    filters.typeIds.length + filters.categoryIds.length + filters.sourceIds.length;

  // Update filters and submit - handle null dates safely
  const updateFilters = (updated: Partial<typeof filters>) => {
    setFilters((prev) => {
      const newFilters = { ...prev, ...updated };
      onSubmit(newFilters);
      return newFilters;
    });
  };

  const updateDraftFilters = (updated: Partial<typeof filters>) => {
    setDraftFilters((prev) => {
      const newFilters = { ...prev, ...updated };
      return newFilters;
    });
  };

  const hadleApplyFilters = () => {
    const startDate = range[0] ? range[0].toISOString().split('T')[0] : defaultStartDate;
    const endDate = range[1] ? range[1].toISOString().split('T')[0] : defaultEndDate;

    const newFilters = {
      ...draftFilters,
      startDate,
      endDate,
    };

    setFilters(newFilters);
    onSubmit(newFilters);
    setIsSheetOpen(false);
  };

  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    if (initialStart && initialEnd) {
      router.replace(pathname);
    }

    const [start, end] = dates;
    setRange(dates);
    updateFilters({
      startDate: start ? start.toISOString().split('T')[0] : undefined,
      endDate: end ? end.toISOString().split('T')[0] : undefined,
    });
    updateDraftFilters({
      startDate: start ? start.toISOString().split('T')[0] : undefined,
      endDate: end ? end.toISOString().split('T')[0] : undefined,
    });

    if (end) {
      setOpenDatePicker(false);
    }
  };

  // Toggle selection in a multi-select array
  const toggleSelection = (id: string, field: 'typeIds' | 'categoryIds' | 'sourceIds') => {
    const currentSelection = [...draftFilters[field]];
    const index = currentSelection.indexOf(id);

    if (index === -1) {
      currentSelection.push(id);
    } else {
      currentSelection.splice(index, 1);
    }

    updateDraftFilters({ [field]: currentSelection });
  };

  // Reset all filters
  const handleReset = () => {
    const resetValues = {
      typeIds: [],
      categoryIds: [],
      sourceIds: [],
      startDate: defaultStartDate,
      endDate: defaultEndDate,
    };

    setFilters(resetValues);

    setRange([new Date(resetValues.startDate), new Date(resetValues.endDate)]);

    onReset();
    onSubmit(resetValues);
    router.replace(`/transactions`);
  };

  useEffect(() => {
    if (isSheetOpen) {
      setDraftFilters((prev) => {
        const newFilters = {
          ...prev,
          typeIds: [...filters.typeIds],
          categoryIds: [...filters.categoryIds],
          sourceIds: [...filters.sourceIds],
        };
        return newFilters;
      });
    }
  }, [isSheetOpen]);

  // Initialize from URL params
  useEffect(() => {
    const rawStart = searchParams.get('start_date');
    const rawEnd = searchParams.get('end_date');

    const isStartValid = isValidDateParam(rawStart);
    const isEndValid = isValidDateParam(rawEnd);

    if (!isStartValid || !isEndValid) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('start_date');
      params.delete('end_date');
      router.replace(`/transactions?${params.toString()}`);
    }
  }, [searchParams, router]);

  // Set initial values with safe date handling
  useEffect(() => {
    const rawStart = searchParams.get('start_date');
    const rawEnd = searchParams.get('end_date');

    const isStartValid = isValidDateParam(rawStart);
    const isEndValid = isValidDateParam(rawEnd);

    const startDate = isStartValid ? rawStart! : defaultStartDate;
    const endDate = isEndValid ? rawEnd! : defaultEndDate;

    // Jika invalid, bersihkan URL
    if (!isStartValid || !isEndValid) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('start_date');
      params.delete('end_date');
      router.replace(`${pathname}?${params.toString()}`);
    }

    const parsedStart = new Date(startDate);
    const parsedEnd = new Date(endDate);

    setFilters((prev) => ({ ...prev, startDate, endDate }));
    setDraftFilters((prev) => ({ ...prev, startDate, endDate }));
    setRange([parsedStart, parsedEnd]);
  }, [searchParams, pathname, defaultStartDate, defaultEndDate]);

  // useEffect(() => {
  //   const resetValues = {
  //     typeIds: [],
  //     categoryIds: [],
  //     sourceIds: [],
  //     startDate: defaultStartDate,
  //     endDate: defaultEndDate,
  //   };

  //   setFilters(resetValues);
  //   setDraftFilters(resetValues);
  //   setRange([new Date(defaultStartDate), new Date(defaultEndDate)]);
  // }, [pathname]);

  // useEffect(() => {
  //   const params = new URLSearchParams();
  //   if (filters.startDate) params.set('start_date', filters.startDate);
  //   if (filters.endDate) params.set('end_date', filters.endDate);
  //   router.replace(`/transactions?${params.toString()}`);
  // }, [filters.startDate, filters.endDate]);

  useEffect(() => {
    if (pathname === '/transactions' && !initialStart && !initialEnd) {
      const resetValues = {
        typeIds: [],
        categoryIds: [],
        sourceIds: [],
        startDate: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
        endDate: format(endOfMonth(new Date()), 'yyyy-MM-dd'),
      };

      setFilters(resetValues);
      setDraftFilters(resetValues);
      setRange([new Date(resetValues.startDate), new Date(resetValues.endDate)]);

      onReset();
      onSubmit(resetValues);
    }
  }, [pathname, initialStart, initialEnd]);

  return (
    <div className="flex items-center gap-2 w-full">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="text-xs sm:text-sm relative h-9 px-3 w-full sm:w-min"
          >
            <Filter className="sm:mr-2 h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge
                variant="destructive"
                className="text-[8px] w-4 h-4 sm:text-xs sm:h-5 sm:w-5 p-0 flex items-center justify-center rounded-full"
              >
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>

        <SheetContent side="bottom" className="h-[85vh] rounded-t-xl pt-6">
          <SheetHeader className="mb-4">
            <SheetTitle className="text-center">Filters</SheetTitle>
          </SheetHeader>

          <ScrollArea className="h-[calc(100%-120px)] px-1">
            <div className="space-y-6 pb-4 mr-4">
              {/* Transaction Types */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Transaction Types</h3>
                  {draftFilters.typeIds.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs"
                      onClick={() => updateDraftFilters({ typeIds: [] })}
                    >
                      Clear
                    </Button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {isLoadingTypes ? (
                    <div className="text-sm text-muted-foreground">Loading...</div>
                  ) : (
                    transactionTypeData?.data?.map((type) => (
                      <Badge
                        key={type.id}
                        variant={draftFilters.typeIds.includes(type.id) ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => toggleSelection(type.id, 'typeIds')}
                      >
                        {type.name}
                      </Badge>
                    ))
                  )}
                </div>
              </div>

              <Separator />

              {/* Categories */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Categories</h3>
                  {draftFilters.categoryIds.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs"
                      onClick={() => updateDraftFilters({ categoryIds: [] })}
                    >
                      Clear
                    </Button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {isLoadingCategories ? (
                    <div className="text-sm text-muted-foreground">Loading...</div>
                  ) : (
                    categoryData?.data?.map((category) => (
                      <Badge
                        key={category.id}
                        variant={
                          draftFilters.categoryIds.includes(category.id) ? 'default' : 'outline'
                        }
                        className="cursor-pointer"
                        onClick={() => toggleSelection(category.id, 'categoryIds')}
                      >
                        {category.name}
                      </Badge>
                    ))
                  )}
                </div>
              </div>

              <Separator />

              {/* Sources */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Sources</h3>
                  {draftFilters.sourceIds.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs"
                      onClick={() => updateDraftFilters({ sourceIds: [] })}
                    >
                      Clear
                    </Button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {isLoadingSources ? (
                    <div className="text-sm text-muted-foreground">Loading...</div>
                  ) : (
                    sourcesData?.data?.sources.map((source: any) => (
                      <Badge
                        key={source.id}
                        variant={draftFilters.sourceIds.includes(source.id) ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => toggleSelection(source.id, 'sourceIds')}
                      >
                        {source.name}
                      </Badge>
                    ))
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="absolute bottom-0 left-0 right-0 border-t bg-background p-4 flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                handleReset();
                setIsSheetOpen(false);
              }}
            >
              Reset All
            </Button>
            <Button className="flex-1" onClick={() => hadleApplyFilters()}>
              Apply
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <Popover open={openDatePicker} onOpenChange={setOpenDatePicker}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-max sm:min-w-56 justify-start text-xs sm:text-sm font-normal"
          >
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
  );
};

export default TransactionFilters2;
