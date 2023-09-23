/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
  deleteTransaction: (data: number) => Promise<void>;
  updateTransaction: (data: TransactionProp) => Promise<void>;
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
        // console.log(query, " auqi a quey");
        // const response = await api.get("transactions");
        const response = await api.get("transactions");

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

  const deleteTransaction = async (id: number) => {
    try {
      const updatedTransactions = transactions.filter(
        (transaction) => transaction.id !== id
      );

      await api.delete(`transactions/${id}`);

      setTransactions(updatedTransactions);
    } catch (e) {
      console.log(e, "error aqui");
    }
  };

  const updateTransaction = async (item: TransactionProp) => {
    try {
      const updatedTransaction = transactions.find(
        (transaction) => transaction.id === item.id
      );

      if (updatedTransaction) {
        const update = {
          description: item.description,
          price: item.price,
          category: item.category,
          type: item.type,
          createdAt: item.createdAt,
        };

        await api.put(`transactions/${item.id}`, update);
      }

      console.log("it worked");
    } catch (e) {
      console.log(e, "erro na atualização");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <TransactionContext.Provider
      value={{
        transactions: transactions,
        fetchTransactions,
        createTransaction,
        deleteTransaction,
        updateTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
