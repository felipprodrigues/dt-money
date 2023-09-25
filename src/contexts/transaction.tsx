/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react-hooks/exhaustive-deps */
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
  createdat: string;
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

  useEffect(() => {
    fetchTransactions();
  }, [transactions]);

  const fetchTransactions = useCallback(
    /*
      @ useCallBack é um hook focado em performance que memoriza funções
      @ e as recria caso uma de suas dependências seja alterada.
    */
    async (): Promise<void> => {
      try {
        const response = await api.get("transactions");

        const data = response.data;
        const reverseData = data.reverse();

        setTransactions(reverseData);
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
      console.log(e, "error on deleting");
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
          createdat: item.createdat,
        };

        await api.put(`transactions/${item.id}`, update);
      }

      console.log("it worked");
    } catch (e) {
      console.log(e, "errr on updating");
    }
  };

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
