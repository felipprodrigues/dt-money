import { ThemeProvider } from "styled-components";
import { TransactionsProvider } from "./contexts/transaction.tsx";
import { Transactions } from "./pages/Transactions";
import { defaultTheme } from "./styles/theme/default";
import { GlobalStyle } from "./styles/global";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
      <Transactions />
    </ThemeProvider>
  );
}
