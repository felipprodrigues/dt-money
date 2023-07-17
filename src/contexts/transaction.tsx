import { ReactNode, useEffect, useState, useCallback } from "react";
import { createContext } from "use-context-selector";
import { api } from "../lib/axios";

export interface TransactionProp {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}

interface TransactionContextType {
  transactions: TransactionProp[];
  fetchTransactions: (query: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

export const TransactionContext = createContext({} as TransactionContextType);

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProp[]>([]);

  const fetchTransactions = useCallback(
    /*
      @ useCallBack é um hook focado em performance que memoriza funções
      @ e as recria caso uma de suas dependências seja alterada.
    */
    async (query?: string): Promise<void> => {
      try {
        const response = await api.get("transactions", {
          params: {
            _sort: "createdAt",
            _order: "desc",
            q: query,
          },
        });

        setTransactions(response.data);
      } catch (error) {
        console.log(error);
        return;
      }
    },
    []
  );

  const createTransaction = useCallback(
    /*
      @ useCallBack é um hook focado em performance que memoriza funções
      @ e as recria caso uma de suas dependências seja alterada.
    */
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data;

      const response = await api.post("transactions", {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      });

      setTransactions((state: TransactionProp[]) => [response.data, ...state]);
    },
    []
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <TransactionContext.Provider
      value={{
        transactions: transactions,
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
