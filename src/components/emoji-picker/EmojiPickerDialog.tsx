"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useEmojiStore } from "@/stores/useEmojiStore";
import { Trash2 } from "lucide-react"; // Pastikan lucide-react sudah terpasang

export default function EmojiPickerDialog() {
  const { selectedEmoji, setSelectedEmoji, colorHex, setColorHex } =
    useEmojiStore();
  const [open, setOpen] = useState(false);

  const handleClear = () => {
    setSelectedEmoji(""); // Reset emoji ke kosong
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`flex items-center justify-center w-8 h-8 rounded-md transition text-xl ${!selectedEmoji ? "bg-muted" : "bg-transparent"}`}
        >
          {selectedEmoji ? (
            <span>{selectedEmoji}</span>
          ) : (
            <span className="text-muted-foreground">+</span>
          )}
        </button>
      </DialogTrigger>

      <DialogContent className="w-fit max-w-md">
        <DialogHeader>
          <DialogTitle>Pilih Emoji</DialogTitle>
        </DialogHeader>

        {/* Emoji Picker */}
        <Picker
          data={data}
          onEmojiSelect={(emoji: any) => {
            setSelectedEmoji(emoji.native);
            setOpen(false);
          }}
          theme="light"
        />

        {/* Tombol Clear */}
        {selectedEmoji && (
          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              onClick={handleClear}
              className="flex items-center gap-2 text-red-500"
            >
              <Trash2 size={16} /> Clear
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
