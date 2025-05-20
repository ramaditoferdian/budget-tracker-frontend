'use client';

import { useEffect, useState } from 'react';
import { Controller, Path, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import {
  useCreateTransaction,
  useUpdateTransaction,
} from '@/modules/transactions/hooks/useTransactions';
import { useTransactionTypes } from '@/modules/transactionTypes/hooks/useTransactionTypes';
import { useCategories } from '@/modules/categories/hooks/useCategories';
import { useSources } from '@/modules/sources/hooks/useSources';

import { parseRupiah, formatRupiah } from '@/utils/rupiah';
import DatePicker from 'react-datepicker';
import { CalendarIcon } from 'lucide-react';
import { getColorSelect } from '@/utils/format-color';

import { Transaction } from '@/types';
import { useDialog } from '@/hooks/useDialog';
import { queryClient } from '@/lib/queryClient';

type Mode = 'create' | 'edit';

interface TransactionFormDialogProps {
  mode: Mode;
  transaction?: Transaction;
}

const transactionSchema = z
  .object({
    typeId: z.string().min(1, 'Transaction type is required'),
    categoryId: z.string().optional(),
    sourceId: z.string().min(1, 'Source is required'),
    targetSourceId: z.string().optional(),
    amount: z.number().nonnegative('Amount cannot be negative'),
    description: z.string().min(3, 'Description must be at least 3 characters'),
    date: z.string().min(1, 'Date is required'),
  })
  .superRefine((data, ctx) => {
    if (data.typeId !== 'transfer-type') {
      // categoryId wajib jika tipe transfer
      if (!data.categoryId) {
        ctx.addIssue({
          path: ['categoryId'],
          code: z.ZodIssueCode.custom,
          message: 'Category is required for transfer type',
        });
      }
    } else {
      // targetSourceId wajib jika bukan transfer
      if (!data.targetSourceId) {
        ctx.addIssue({
          path: ['targetSourceId'],
          code: z.ZodIssueCode.custom,
          message: 'Target source is required for non-transfer type',
        });
      }
    }
  });

type TransactionFormValues = z.infer<typeof transactionSchema>;

const getDefaultValues = (tx?: Transaction): TransactionFormValues => ({
  typeId: tx?.typeId || '',
  categoryId: tx?.categoryId || '',
  sourceId: tx?.sourceId || '',
  targetSourceId: tx?.targetSourceId || '',
  amount: tx?.amount || 0,
  description: tx?.description || '',
  date: tx?.date || new Date().toISOString().split('T')[0],
});

export default function TransactionForm({
  mode = 'create',
  transaction,
}: TransactionFormDialogProps) {
  const [amountDisplay, setAmountDisplay] = useState(formatRupiah('0'));

  const [isInitialEdit, setIsInitialEdit] = useState(true);

  const { setOpen: setOpenDialogCreate } = useDialog('transaction-form:create');
  const { setOpen: setOpenDialogEdit } = useDialog('transaction-form:edit');

  const { data: transactionTypes } = useTransactionTypes();
  const { data: categories } = useCategories();
  const { data: sources } = useSources();

  const {
    mutate: mutateCreateTransaction,
    isPending: isPendingCreateTransaction,
    isError: isErrorCreateTransaction,
    isSuccess: isSuccessCreateTransaction,
  } = useCreateTransaction();
  const {
    mutate: mutateUpdateTransaction,
    isPending: isPendingUpdateTransaction,
    isError: isErrorUpdateTransaction,
    isSuccess: isSuccessUpdateTransaction,
  } = useUpdateTransaction();

  const isDisabled = isPendingCreateTransaction || isPendingUpdateTransaction;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TransactionFormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(transactionSchema),
    defaultValues: getDefaultValues(transaction),
  });

  const selectedTypeId = watch('typeId');
  const selectedSourceId = watch('sourceId');
  const selectedTargetSourceId = watch('targetSourceId');
  const selectedCategoryId = watch('categoryId');

  const filteredCategories = categories?.data.filter(
    (cat) => cat.transactionTypeId === selectedTypeId
  );

  useEffect(() => {
    if (mode === 'edit' && transaction) {
      reset({
        typeId: transaction.typeId,
        categoryId: transaction.categoryId || '',
        sourceId: transaction.sourceId,
        targetSourceId: transaction.targetSourceId || '',
        amount: transaction.amount,
        description: transaction.description,
        date: transaction.date,
      });
      setAmountDisplay(formatRupiah(transaction.amount.toString()));
      setIsInitialEdit(true); // set true karena form baru dibuka
    }
  }, [mode, transaction, reset]);

  useEffect(() => {
    if (isInitialEdit) {
      return;
    }
    setValue('categoryId', '');
    setValue('sourceId', '');
    setValue('targetSourceId', '');
  }, [isInitialEdit, selectedTypeId, setValue]);

  const onSubmit = (values: TransactionFormValues) => {
    if (mode === 'edit' && transaction?.id) {
      mutateUpdateTransaction(
        {
          id: transaction.id,
          payload: {
            ...values,
          },
        },
        {
          onSuccess: () => {
            queryClient
              .invalidateQueries({
                predicate: (query) => query.queryKey[0] === 'transactions',
              })
              .then(() => {
                queryClient.invalidateQueries({
                  predicate: (query) => query.queryKey[0] === 'sources',
                });
              });

            toast.success('Transaction updated successfully!');
            setOpenDialogEdit(false);
          },
          onError: () => {
            toast.error('Failed to update transaction');
          },
        }
      );
    } else {
      mutateCreateTransaction(values, {
        onSuccess: () => {
          queryClient
            .invalidateQueries({
              predicate: (query) => query.queryKey[0] === 'transactions',
            })
            .then(() => {
              queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === 'sources',
              });
            });

          toast.success('Transaction added successfully!');
          reset();
          setAmountDisplay(formatRupiah('0'));
          setOpenDialogCreate(false);
        },
        onError: () => {
          toast.error('Failed to add transaction');
        },
      });
    }
  };

  const renderSelect = (
    name: Path<TransactionFormValues>,
    placeholder: string,
    value: string,
    options: { id: string; name: string }[],
    onChange: (val: string) => void,
    error?: string
  ) => (
    <>
      <Select value={value} onValueChange={onChange} {...register(name)}>
        <SelectTrigger
          disabled={isDisabled}
          className={`rounded-xl border px-3 py-2 text-sm shadow-sm focus:ring-1 focus:ring-ring focus:outline-none ${
            value && getColorSelect(value)
          }`}
        >
          <span className={value ? '' : 'text-muted-foreground'}>
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
        'typeId',
        'Select Type',
        selectedTypeId,
        transactionTypes?.data || [],
        (val) => setValue('typeId', val),
        errors.typeId?.message
      )}

      {['expense-type', 'income-type'].includes(selectedTypeId) &&
        renderSelect(
          'categoryId',
          'Select Category',
          selectedCategoryId || '',
          filteredCategories || [],
          (val) => setValue('categoryId', val),
          errors.categoryId?.message
        )}

      {renderSelect(
        'sourceId',
        'Select Source',
        selectedSourceId || '',
        sources?.data.sources || [],
        (val) => setValue('sourceId', val),
        errors.sourceId?.message
      )}

      {selectedTypeId === 'transfer-type' &&
        renderSelect(
          'targetSourceId',
          'Select Target Source',
          selectedTargetSourceId || '',
          sources?.data.sources.filter((s) => s.id !== selectedSourceId) || [],
          (val) => setValue('targetSourceId', val),
          errors.targetSourceId?.message
        )}

      <Input
        type="text"
        value={amountDisplay}
        disabled={isDisabled}
        onChange={(e) => {
          const parsed = parseRupiah(e.target.value);
          setAmountDisplay(formatRupiah(parsed.toString()));
          setValue('amount', parsed);
        }}
        placeholder="Amount"
        className="text-left rounded-xl border px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-ring focus:outline-none"
      />
      {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>}

      <Input
        type="text"
        disabled={isDisabled}
        {...register('description')}
        placeholder="Description"
        className="rounded-xl border px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-ring focus:outline-none"
      />
      {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}

      <Controller
        control={control}
        disabled={isDisabled}
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
                onChange={(date) => field.onChange(date?.toISOString().split('T')[0])}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select date"
                className="w-full rounded-xl border border-input px-3 py-2 pr-10 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-ring"
                popperPlacement="bottom-start"
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
            {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>}
          </div>
        )}
      />

      <DialogFooter>
        <Button type="submit" disabled={isSubmitting || isDisabled}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </DialogFooter>
    </form>
  );
}
