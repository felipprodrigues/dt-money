import { TransactionContext } from "../contexts/transaction";
import { useContextSelector } from "use-context-selector";

export function useSummary() {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions;
  });

  if (!transactions) return;

  const summary = transactions.reduce(
    (acc, cur) => {
      if (cur.type === "income") {
        acc.income += cur.price;
        acc.total += cur.price;
      } else {
        acc.outcome += cur.price;
        acc.total -= cur.price;
      }

      return acc;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    }
  );

  /*
   * UseMemo é um hook focado em performance que memoriza valores computados e
   * reavalia esses valores caso uma de suas dependências seja alterada.
   */
  // const summary = useMemo(() => {
  //   return transactions.reduce(
  //     (acc, cur) => {
  //       if (cur.type === "income") {
  //         acc.income += cur.price;
  //         acc.total += cur.price;
  //       } else {
  //         acc.outcome += cur.price;
  //         acc.total -= cur.price;
  //       }

  //       return acc;
  //     },
  //     {
  //       income: 0,
  //       outcome: 0,
  //       total: 0,
  //     }
  //   );
  // }, [transactions]);

  return summary;
}
