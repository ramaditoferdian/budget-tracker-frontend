"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";

import { useTransactionTypes } from "@/modules/transactionTypes/hooks/useTransactionTypes";
import { useCreateCategory } from "@/modules/categories/hooks/useCategories";
import { toast } from "sonner";
import EmojiPickerDialog from "@/components/emoji-picker/EmojiPickerDialog";

import { useEmojiStore } from "@/stores/useEmojiStore";
import { useEffect } from "react";

const categorySchema = z.object({
  name: z.string().min(1, "Nama kategori wajib diisi"),
  transactionTypeId: z.string().min(1, "Jenis transaksi wajib dipilih"),
  emoji: z.string().min(1, "Emoji wajib dipilih"),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export default function CategoryForm() {
  const { selectedEmoji, setSelectedEmoji } = useEmojiStore();
  const { data: transactionTypes, isError, isLoading } = useTransactionTypes();
  const createMutation = useCreateCategory();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      transactionTypeId: "",
      emoji: "", // Set default value for emoji to empty
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  // Handle emoji selection on form submit
  useEffect(() => {
    if (selectedEmoji) {
      setValue("emoji", selectedEmoji); // update form with selected emoji
    }
  }, [selectedEmoji, setValue]);

  const onSubmit = (data: CategoryFormValues) => {
    if (!selectedEmoji) {
      toast.error("Emoji wajib dipilih!");
      return;
    }

    // Combine emoji + name for payload
    const payload = {
      ...data,
      name: `${selectedEmoji} ${data.name}`, // concatenate emoji to name
    };

    createMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Kategori berhasil ditambahkan.");
        form.reset();
        setSelectedEmoji(""); // Reset emoji after success
      },
      onError: (err: any) => {
        const message =
          err?.response?.data?.errors?.message || "Gagal menambahkan kategori";
        toast.error(message);
      },
    });
  };

  if (isLoading) return <div>Loading transaction types...</div>;
  if (isError) return <div>Error loading transaction types.</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-3">
        {/* Emoji Picker di kiri input */}
        <div className="flex flex-row gap-x-2">
          <EmojiPickerDialog />
          <Input
            {...register("name")}
            placeholder="Nama kategori (cth: Makan)"
          />
        </div>
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        {errors.emoji && (
          <p className="text-sm text-red-500">{errors.emoji.message}</p>
        )}

        {/* Jenis transaksi */}
        <Select
          value={watch("transactionTypeId")}
          onValueChange={(value) => setValue("transactionTypeId", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih jenis transaksi" />
          </SelectTrigger>
          <SelectContent>
            {transactionTypes?.data.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.transactionTypeId && (
          <p className="text-sm text-red-500">{errors.transactionTypeId.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        Tambah Kategori
      </Button>
    </form>
  );
}
