import { ArrowCircleDown, ArrowCircleUp } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./styles";
import { priceFormatter } from "../../utils/formatter";

import { useSummary } from "../../hoooks/useSummary";

export function Summary() {
  const summary = useSummary();

  if (!summary) return;

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entries</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong>{priceFormatter.format(summary.income)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Exit</span>
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
