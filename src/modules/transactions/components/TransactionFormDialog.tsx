// src/modules/transactions/components/TransactionFormDialog.tsx
"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  useCreateTransaction,
  useUpdateTransaction,
} from "@/modules/transactions/hooks/useTransactions";
import { useTransactionTypes } from "@/modules/transactionTypes/hooks/useTransactionTypes";
import { useCategories } from "@/modules/categories/hooks/useCategories";
import { useSources } from "@/modules/sources/hooks/useSources";

import { parseRupiah, formatRupiah } from "@/utils/rupiah";
import DatePicker from "react-datepicker";
import { CalendarIcon } from "lucide-react";
import { getBadgeColor, getColorSelect } from "@/utils/format-color";

import { Transaction } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

type Mode = "create" | "edit";

interface TransactionFormDialogProps {
  mode: Mode;
  transaction?: Transaction;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const transactionSchema = z.object({
  typeId: z.string().min(1, "Transaction type is required"),
  categoryId: z.string().optional(),
  sourceId: z.string().min(1, "Source is required"),
  targetSourceId: z.string().optional(),
  amount: z.number().nonnegative("Amount cannot be negative"),
  description: z.string().min(1, "Description is required"),
  date: z.string().min(1, "Date is required"),
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

const getDefaultValues = (tx?: Transaction): TransactionFormValues => ({
  typeId: tx?.typeId || "",
  categoryId: tx?.categoryId || "",
  sourceId: tx?.sourceId || "",
  targetSourceId: tx?.targetSourceId || "",
  amount: tx?.amount || 0,
  description: tx?.description || "",
  date: tx?.date || new Date().toISOString().split("T")[0],
});


function TransactionForm({
  mode = "create",
  transaction,
  open,
  setOpen,
}: TransactionFormDialogProps) {
  const [amountDisplay, setAmountDisplay] = useState(formatRupiah("0"));

  const [isInitialEdit, setIsInitialEdit] = useState(true);

  const { data: transactionTypes } = useTransactionTypes();
  const { data: categories } = useCategories();
  const { data: sources } = useSources();
  const createTransaction = useCreateTransaction();
  const updateTransaction = useUpdateTransaction();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: getDefaultValues(transaction),
  });

  const selectedTypeId = watch("typeId");
  const selectedSourceId = watch("sourceId");
  const selectedTargetSourceId = watch("targetSourceId");
  const selectedCategoryId = watch("categoryId");

  const filteredCategories = categories?.data.filter(
    (cat) => cat.transactionTypeId === selectedTypeId
  );

  useEffect(() => {
    if (open && mode === "edit" && transaction) {
      reset({
        typeId: transaction.typeId,
        categoryId: transaction.categoryId || "",
        sourceId: transaction.sourceId,
        targetSourceId: transaction.targetSourceId || "",
        amount: transaction.amount,
        description: transaction.description,
        date: transaction.date,
      });
      setAmountDisplay(formatRupiah(transaction.amount.toString()));
      setIsInitialEdit(true); // set true karena form baru dibuka
    }
  }, [open, mode, transaction, reset]);

  useEffect(() => {
    if (!open) {
      const timeout = setTimeout(() => {
        reset({
          typeId: "",
          categoryId: "",
          sourceId: "",
          targetSourceId: "",
          amount: 0,
          description: "",
          date: new Date().toISOString().split("T")[0],
        });
        setAmountDisplay(formatRupiah("0"));
        setIsInitialEdit(true);
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [open, reset]);

  useEffect(() => {
    if (isInitialEdit) {
      return;
    }
    setValue("categoryId", "");
    setValue("sourceId", "");
    setValue("targetSourceId", "");
  }, [isInitialEdit, selectedTypeId, setValue]);

  const onSubmit = (values: TransactionFormValues) => {
    if (mode === "edit" && transaction?.id) {
      updateTransaction.mutate(
        {
          id: transaction.id,
          payload: {
            ...values,
            targetSourceId: null,
          },
        },
        {
          onSuccess: () => {
            toast.success("Transaction updated successfully!");
            setOpen(false);
          },
          onError: () => {
            toast.error("Failed to update transaction");
          },
        }
      );
    } else {
      createTransaction.mutate(values, {
        onSuccess: () => {
          toast.success("Transaction added successfully!");
          reset();
          setAmountDisplay(formatRupiah("0"));
          setOpen(false);
        },
        onError: () => {
          toast.error("Failed to add transaction");
        },
      });
    }
  };

  const renderSelect = (
    placeholder: string,
    value: string,
    options: { id: string; name: string }[],
    onChange: (val: string) => void,
    error?: string
  ) => (
    <>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className={`rounded-xl border px-3 py-2 text-sm shadow-sm focus:ring-1 focus:ring-ring focus:outline-none ${
            value && getColorSelect(value)
          }`}
        >
          <span className={value ? "" : "text-muted-foreground"}>
            {options.find((o) => o.id === value)?.name || placeholder}
          </span>
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem
              key={opt.id}
              value={opt.id}
              className="cursor-pointer px-3 py-2 text-sm rounded-md focus:bg-muted transition-colors hover:bg-black/30"
            >
              {opt.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {renderSelect(
        "Select Type",
        selectedTypeId,
        transactionTypes?.data || [],
        (val) => setValue("typeId", val),
        errors.typeId?.message
      )}

      {["expense-type", "income-type"].includes(selectedTypeId) &&
        renderSelect(
          "Select Category",
          selectedCategoryId || "",
          filteredCategories || [],
          (val) => setValue("categoryId", val),
          errors.categoryId?.message
        )}

      {renderSelect(
        "Select Source",
        selectedSourceId || "",
        sources?.data.sources || [],
        (val) => setValue("sourceId", val),
        errors.sourceId?.message
      )}

      {selectedTypeId === "transfer-type" &&
        renderSelect(
          "Select Target Source",
          selectedTargetSourceId || "",
          sources?.data.sources.filter((s) => s.id !== selectedSourceId) || [],
          (val) => setValue("targetSourceId", val),
          errors.targetSourceId?.message
        )}

      <Input
        type="text"
        value={amountDisplay}
        onChange={(e) => {
          const parsed = parseRupiah(e.target.value);
          setAmountDisplay(formatRupiah(parsed.toString()));
          setValue("amount", parsed);
        }}
        placeholder="Amount"
        className="text-left rounded-xl border px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-ring focus:outline-none"
      />
      {errors.amount && (
        <p className="text-sm text-red-500">{errors.amount.message}</p>
      )}

      <Input
        type="text"
        {...register("description")}
        placeholder="Description"
        className="rounded-xl border px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-ring focus:outline-none"
      />
      {errors.description && (
        <p className="text-sm text-red-500">{errors.description.message}</p>
      )}

      <Controller
        control={control}
        name="date"
        render={({ field }) => (
          <div className="flex flex-col gap-1">
            <label htmlFor="date" className="text-sm text-muted-foreground">
              Date
            </label>
            <div className="relative w-fit">
              <DatePicker
                id="date"
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) =>
                  field.onChange(date?.toISOString().split("T")[0])
                }
                dateFormat="dd/MM/yyyy"
                placeholderText="Select date"
                className="w-full rounded-xl border border-input px-3 py-2 pr-10 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-ring"
                popperPlacement="bottom-start"
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
            {errors.date && (
              <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>
            )}
          </div>
        )}
      />

      <DialogFooter>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default function TransactionFormDialog({
  mode = "create",
  transaction,
  open,
  setOpen,
}: TransactionFormDialogProps) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mode === "edit" ? "Edit Transaction" : "Add Transaction"}
            </DialogTitle>
          </DialogHeader>
          <TransactionForm
            mode={mode}
            transaction={transaction}
            open={open}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DrawerContent className="p-10">
        <DrawerHeader>
          <DrawerTitle>
            {mode === "edit" ? "Edit Transaction" : "Add Transaction"}
          </DrawerTitle>
        </DrawerHeader>

        <TransactionForm
          mode={mode}
          transaction={transaction}
          open={open}
          setOpen={setOpen}
        />
      </DrawerContent>
    </Drawer>
  );
}
