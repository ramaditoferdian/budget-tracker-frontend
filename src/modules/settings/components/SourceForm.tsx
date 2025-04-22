"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useCreateSource } from "@/modules/sources/hooks/useSources";
import { parseRupiah, formatRupiah } from "@/utils/rupiah";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const sourceSchema = z.object({
  name: z.string().min(1, "Nama sumber wajib diisi"),
  initialAmount: z
    .number({ invalid_type_error: "Masukkan angka yang valid" })
    .nonnegative("Dana awal tidak boleh negatif"),
});

type SourceFormValues = z.infer<typeof sourceSchema>;

export default function SourceForm() {
  const createSource = useCreateSource();
  const [open, setOpen] = useState(false);
  const [amountDisplay, setAmountDisplay] = useState(formatRupiah("0"));

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SourceFormValues>({
    resolver: zodResolver(sourceSchema),
    defaultValues: {
      name: "",
      initialAmount: 0,
    },
  });

  const onSubmit = (values: SourceFormValues) => {
    createSource.mutate(values, {
      onSuccess: () => {
        toast.success("Sumber dana berhasil ditambahkan!");
        reset();
        setAmountDisplay(formatRupiah("0"));
        setOpen(false);
      },
      onError: () => {
        toast.error("Gagal menambahkan sumber dana");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Tambah Sumber Dana</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base">Tambah Sumber Dana</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 mt-2"
        >
          <div>
            <Input
              {...register("name")}
              placeholder="Nama sumber dana (contoh: BCA, Dompet)"
              className="text-base placeholder:text-muted-foreground"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Input
              type="text"
              value={amountDisplay}
              onChange={(e) => {
                const parsed = parseRupiah(e.target.value);
                setAmountDisplay(formatRupiah(parsed.toString()));
                setValue("initialAmount", parsed);
              }}
              placeholder="Dana awal"
              className="text-base text-left font-medium"
            />
            {errors.initialAmount && (
              <p className="text-sm text-red-500 mt-1">
                {errors.initialAmount.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting || createSource.isPending}
            >
              {isSubmitting || createSource.isPending ? "Menyimpan..." : "Tambah"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
