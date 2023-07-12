import { ArrowCircleDown, ArrowCircleUp } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./styles";
import { useContext } from "react";
import { TransactionContext } from "../../contexts/transaction";
import { priceFormatter } from "../../utils/formatter";

export function Summary() {
  const { transactions } = useContext(TransactionContext);

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

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong>{priceFormatter.format(summary.income)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>

        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <ArrowCircleUp size={32} color="#fff" />
        </header>

        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
