"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransactionFilters } from "@/modules/transactions/hooks/useTransactionFilters";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { endOfMonth, format, startOfMonth } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TransactionFormDialog from "./TransactionFormDialog";
import { useTransactionTypes } from "@/modules/transactionTypes/hooks/useTransactionTypes";
import { useCategories } from "@/modules/categories/hooks/useCategories";

const TransactionsHeader = () => {
  const [open, setOpen] = useState(false);

  const {
    typeId: storeTypeId,
    setTypeId,
    categoryId: storeCategoryId,
    setCategoryId,
    startDate: storeStartDate,
    endDate: storeEndDate,
    setStartDate,
    setEndDate,
    resetFilters,
  } = useTransactionFilters();

  const [filters, setFilters] = useState({
    typeId: storeTypeId || "",
    categoryId: storeCategoryId || "",
    startDate: storeStartDate || null,
    endDate: storeEndDate || null,
  });

  const {
    data: transactionTypeData,
    isLoading: isLoadingTypes,
  } = useTransactionTypes();

  const {
    data: categoryData,
    isLoading: isLoadingCategories,
  } = useCategories({ transactionTypeId: filters.typeId });

  const initialStart = filters.startDate ? new Date(filters.startDate) : null;
  const initialEnd = filters.endDate ? new Date(filters.endDate) : null;

  const [range, setRange] = useState<[Date | null, Date | null]>([
    initialStart,
    initialEnd,
  ]);

  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setRange(dates);
    if (start)
      setFilters((prev) => ({
        ...prev,
        startDate: start.toISOString().split("T")[0],
      }));
    if (end)
      setFilters((prev) => ({
        ...prev,
        endDate: end.toISOString().split("T")[0],
      }));
  };

  useEffect(() => {
    setRange([
      filters.startDate ? new Date(filters.startDate) : null,
      filters.endDate ? new Date(filters.endDate) : null,
    ]);
  }, [filters.startDate, filters.endDate]);

  const isCategoryDisabled = !filters.typeId || filters.typeId === "transfer-type";

  const handleSubmit = () => {
    setTypeId(filters.typeId);
    setCategoryId(filters.categoryId);
    setStartDate(filters.startDate || undefined);
    setEndDate(filters.endDate || undefined);
  };

  const handleReset = () => {
    resetFilters();
    setFilters({
      typeId: "",
      categoryId: "",
      startDate: format(startOfMonth(new Date()), "yyyy-MM-dd") || null,
      endDate: format(endOfMonth(new Date()), "yyyy-MM-dd") || null,
    });
  };

  return (
    <>
      {/* MODAL */}

      <TransactionFormDialog
        mode="create"
        open={open}
        setOpen={setOpen}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="flex flex-wrap gap-2 items-center">
          {/* Tipe */}
          <Select
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, typeId: value }))
            }
            value={filters.typeId || ""}
          >
            <SelectTrigger className="w-36 text-sm">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {isLoadingTypes ? (
                <SelectItem value="loading">Memuat...</SelectItem>
              ) : (
                transactionTypeData?.data?.map((type) => (
                  <SelectItem key={type.id} value={type.id.toString()}>
                    {type.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          {/* Kategori */}
          <Select
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, categoryId: value }))
            }
            value={filters.categoryId || ""}
            disabled={isCategoryDisabled || isLoadingCategories}
          >
            <SelectTrigger className="w-36 text-sm">
              <SelectValue
                placeholder={
                  isCategoryDisabled ? "—" : "Category"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {isLoadingCategories ? (
                <SelectItem value="loading">Loading...</SelectItem>
              ) : (
                categoryData?.data?.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          {/* Tanggal */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-52 justify-start text-sm font-normal">
                {filters.startDate && filters.endDate
                  ? `${format(new Date(filters.startDate), "dd/MM/yyyy")} – ${format(
                      new Date(filters.endDate),
                      "dd/MM/yyyy"
                    )}`
                  : "Date"}
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

        <div className="flex gap-2 items-center justify-between md:justify-normal">
          <div className="flex gap-2">
            <Button onClick={handleSubmit} variant="default" className="px-4 text-sm">
              Apply
            </Button>
            <Button onClick={handleReset} variant="ghost" className="px-4 text-sm">
              Reset
            </Button>
          </div>

          <Button onClick={() => setOpen(true)} variant="default">Add Transaction</Button>
        </div>
      </div>
    </>
  );
};

export default TransactionsHeader;
