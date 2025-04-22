// Function to determine badge color based on transaction type
export const getBadgeColor = (transactionType: string | null) => {
  switch (transactionType) {
    case 'Income':
      return 'bg-green-100 text-green-700'; // Light green for income (pastel)
    case 'Expense':
      return 'bg-red-100 text-red-700'; // Light red for expense (pastel)
    default:
      return 'bg-gray-100 text-gray-700'; // Neutral gray for other types (subtle)
  }
}