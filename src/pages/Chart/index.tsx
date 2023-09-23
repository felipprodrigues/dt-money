import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { useContextSelector } from "use-context-selector";
import { dateFormatter } from "../../utils/formatter";

import {
  TransactionContext,
  TransactionProp,
} from "../../contexts/transaction";

import { ChartContainer } from "./styles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function Chart() {
  const { transactions } = useContextSelector(
    TransactionContext,
    (context) => ({
      transactions: context.transactions,
    })
  );

  const incomeTransactions: number[] = [];
  const expenditure: number[] = [];
  const labels: string[] = [];

  transactions.map((item: TransactionProp) => {
    const weekIndex = labels.findIndex((label) => label === item.createdAt);

    // const formattedDate = dateFormatter(item.createdAt);
    // console.log(item.createdAt);

    if (weekIndex === -1) {
      // labels.push(formattedDate);
      incomeTransactions.push(item.type === "income" ? item.price : 0);
      expenditure.push(item.type === "outcome" ? item.price : 0);
    } else {
      if (item.type === "income") {
        incomeTransactions[weekIndex] += item.price;
      } else if (item.type === "outcome") {
        expenditure[weekIndex] += item.price;
      }
    }
  });

  const totalVariations: number[] = [];
  for (let i = 0; i < labels.length; i++) {
    const variation = incomeTransactions[i] - expenditure[i];
    totalVariations.push(variation);
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Entry",
        data: incomeTransactions,
        borderColor: "rgb(53, 235, 141)",
        backgroundColor: "rgba(53, 235, 141, 0.5)",
      },
      {
        label: "Exit",
        data: expenditure,
        borderColor: "rgb(247, 90, 104)",
        backgroundColor: "rgba(247, 90, 104, 0.5)",
      },
      {
        label: "Total Variation",
        data: totalVariations,
        borderColor: "rgb(100, 149, 237)",
        backgroundColor: "rgba(100, 149, 237, 0.5)",
      },
    ],
  };

  return (
    <ChartContainer>
      <Line options={options} data={data} />
    </ChartContainer>
  );
}
