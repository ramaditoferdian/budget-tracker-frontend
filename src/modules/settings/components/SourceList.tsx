"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, Pencil, Check, X } from "lucide-react";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import {
  useDeleteSource,
  useSources,
  useUpdateSource,
} from "@/modules/sources/hooks/useSources";
import { formatRupiah, parseRupiah } from "@/utils/rupiah";

export default function SourceList() {
  const { data, isLoading, isError, error } = useSources();
  const deleteSource = useDeleteSource();
  const updateSource = useUpdateSource();

  const [editId, setEditId] = useState<string | null>(null);
  const [newAmount, setNewAmount] = useState<number>(0);
  const [newName, setNewName] = useState<string>("");

  const handleDelete = (id: string) => {
    deleteSource.mutate(id, {
      onSuccess: () => toast.success("Sumber dana berhasil dihapus!"),
    });
  };

  const handleEdit = (id: string, initialAmount: number, currentName: string) => {
    setEditId(id);
    setNewAmount(initialAmount);
    setNewName(currentName);
  };

  const handleSave = (id: string) => {
    updateSource.mutate(
      { id, payload: { name: newName, initialAmount: newAmount } },
      {
        onSuccess: () => {
          toast.success("Sumber dana diperbarui!");
          setEditId(null);
        },
      }
    );
  };

  const handleCancel = () => {
    setEditId(null);
    setNewAmount(0);
    setNewName("");
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-red-500 text-center py-10">
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );

  if (!data?.data.sources.length) return <div>Tidak ada sumber dana.</div>;

  return (
    <div className="grid gap-4">
      {data.data.sources.map((source) => {
        const isEditing = editId === source.id;

        return (
          <Card
            key={source.id}
            className="p-4 flex flex-col gap-3 border border-muted bg-white"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                {isEditing ? (
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="text-lg font-semibold px-2 py-1 w-full sm:w-64"
                  />
                ) : (
                  <div
                    className="font-semibold text-lg cursor-text hover:bg-muted hover:rounded-md px-2 py-1"
                    onClick={() =>
                      handleEdit(source.id, source.initialAmount ?? 0, source.name)
                    }
                  >
                    {source.name}
                  </div>
                )}
                <div className="text-sm text-muted-foreground px-2">
                  Saldo saat ini:
                  <span className="ml-1 font-medium text-black">
                    Rp {source.balance.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(source.id)}
                disabled={deleteSource.isPending}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>

            {/* Dana Awal */}
            <div className="border-t pt-3 mt-2 text-sm text-muted-foreground flex flex-col gap-0 px-2">
              <span className="text-gray-600">Dana Awal:</span>

              {isEditing ? (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <Input
                    type="text"
                    value={formatRupiah(newAmount.toString())}
                    onChange={(e) => {
                      const numeric = parseRupiah(e.target.value);
                      setNewAmount(numeric);
                    }}
                    className="w-full sm:w-36 h-8 text-right font-medium"
                  />
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleSave(source.id)}
                      disabled={updateSource.isPending}
                    >
                      {updateSource.isPending && editId === source.id ? (
                        <div className="w-4 h-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                      ) : (
                        <Check className="w-4 h-4 text-green-500" />
                      )}
                    </Button>
                    <Button size="icon" variant="ghost" onClick={handleCancel}>
                      <X className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="font-medium text-black">
                    Rp {source.initialAmount?.toLocaleString("id-ID") ?? "0"}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      handleEdit(source.id, source.initialAmount ?? 0, source.name)
                    }
                  >
                    <Pencil className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
