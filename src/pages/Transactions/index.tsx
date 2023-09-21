/* eslint-disable @typescript-eslint/no-misused-promises */
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./SearchForm";
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";
import {
  TransactionContext,
  TransactionProp,
} from "../../contexts/transaction";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { useContextSelector } from "use-context-selector";
import { Trash } from "phosphor-react";
import { Toggle } from "../../components/Toggle";
import { useState } from "react";
import { Chart } from "../Chart";

export function Transactions() {
  const [toggle, setToggle] = useState("table");

  const { transactions, deleteTransaction, updateTransaction } =
    useContextSelector(TransactionContext, (context) => ({
      transactions: context.transactions,
      deleteTransaction: context.deleteTransaction,
      updateTransaction: context.updateTransaction,
    }));

  if (!transactions) return;

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <Toggle setToggle={setToggle} toggle={toggle} />

        {toggle === "table" ? (
          <>
            <SearchForm />

            <TransactionsTable>
              <tbody>
                {transactions.map((item: TransactionProp) => {
                  return (
                    <tr key={item.id} onClick={() => updateTransaction(item)}>
                      <td width="50%">{item.description}</td>
                      <td>
                        <PriceHighlight variant={item.type}>
                          {item.type === "outcome" && "- "}
                          {priceFormatter.format(item.price)}
                        </PriceHighlight>
                      </td>
                      <td>{item.category}</td>
                      <td>{dateFormatter.format(new Date(item.createdAt))}</td>
                      <td>
                        <Trash
                          size={16}
                          onClick={() => deleteTransaction(item.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </TransactionsTable>
          </>
        ) : (
          <Chart />
        )}
      </TransactionsContainer>
    </div>
  );
}
