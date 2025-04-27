import React, { useState } from 'react';
import { Transaction } from '@/types';
import { formatCurrency } from '@/utils/format';
import { Pencil, Trash } from 'phosphor-react';
import { getBadgeColor } from '@/utils/format-color';

interface Props {
  transaction: Transaction;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transactionId: string) => void;
}

const TransactionItem: React.FC<Props> = ({ transaction, onEdit, onDelete }) => {
  const typeName = transaction.type.name.toLowerCase();
  const isIncome = typeName === 'income';
  const isExpense = typeName === 'expense';
  const isTransfer = typeName === 'transfer' || typeName === 'savings';

  const amountColor = isIncome
    ? 'text-green-600'
    : isExpense
      ? 'text-red-600'
      : isTransfer
        ? 'text-blue-600'
        : 'text-neutral-800';

  const amountSign = isIncome ? '+' : isExpense ? '-' : '';
  const categoryName = transaction.category?.name || (isTransfer ? 'Transfer' : 'Uncategorized');
  const sourceName = transaction.source?.name || 'Unknown Source';
  const targetName = transaction.targetSource?.name || '';
  const badgeClass = getBadgeColor(transaction.type.name);
  const secondaryText = isTransfer
    ? `${sourceName}${targetName ? ` → ${targetName}` : ''}`
    : `${sourceName}`;

  return (
    <div className="py-5 px-2 sm:px-4 border-b border-neutral-200 text-sm group relative hover:bg-neutral-100 transition-colors rounded-md">
      <div className="flex flex-col sm:grid sm:grid-cols-3 sm:items-center gap-2">
        {/* Deskripsi & Kategori */}
        <div className="flex flex-col">
          <span className="font-medium break-words">{transaction.description || categoryName}</span>
          <span className="text-neutral-500 text-xs sm:hidden">{categoryName}</span>
        </div>

        {/* Kategori (desktop) */}
        <div className="hidden sm:block text-neutral-500 text-left truncate">{categoryName}</div>

        {/* Jumlah */}
        <div className="flex justify-between sm:justify-end items-center gap-2">
          <span className={`font-semibold ${amountColor}`}>
            {amountSign}
            {formatCurrency(transaction.amount)}
          </span>
        </div>
      </div>

      {/* Badge & Info */}
      <div className="mt-1 text-xs text-neutral-400 flex justify-between items-start sm:items-center flex-col sm:flex-row gap-1">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}>
            {transaction.type.name}
          </span>
          <span className="text-neutral-400">{secondaryText}</span>
        </div>
      </div>

      {/* Action Buttons - Desktop */}
      {(onEdit || onDelete) && (
        <div className="hidden absolute right-2 top-5 sm:right-4 sm:bottom-5 sm:top-auto sm:flex gap-2 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              onClick={() => onEdit(transaction)}
              title="Edit"
              className="hover:text-blue-700"
            >
              <Pencil size={14} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(transaction.id)}
              title="Delete"
              className="hover:text-red-700"
            >
              <Trash size={14} />
            </button>
          )}
        </div>
      )}

      {/* Action Buttons for Mobile - Larger Buttons */}
      {(onEdit || onDelete) && (
        <div className="sm:hidden flex flex-col absolute right-0 top-0 sm:top-auto sm:right-4 sm:bottom-5 opacity-0 group-hover:opacity-100 h-full justify-between">
          {onEdit && (
            <button
              onClick={() => onEdit(transaction)}
              title="Edit"
              className="p-5 active:bg-neutral-400 transition-colors flex justify-center items-center h-full bg-blue-100 text-blue-700 hover:bg-blue-500 hover:text-white rounded-tr-md"
            >
              <Pencil />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(transaction.id)}
              title="Delete"
              className="p-5 active:bg-neutral-500 transition-colors flex justify-center items-center h-full bg-red-100 text-red-700 hover:bg-red-500 hover:text-white rounded-br-md"
            >
              <Trash />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionItem;
