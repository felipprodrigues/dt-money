import { ReactNode, createContext, useEffect, useState } from "react";

export interface TransactionProp {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContextType {
  transactions: TransactionProp[];
}

export const TransactionContext = createContext({} as TransactionContextType);

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProp[]>([]);

  async function loadTransactions(): Promise<void> {
    try {
      const response = await fetch(`http://localhost:3333/transactions`);
      const data = (await response.json()) as TransactionProp[];

      setTransactions(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions: transactions }}>
      {children}
    </TransactionContext.Provider>
  );
}
