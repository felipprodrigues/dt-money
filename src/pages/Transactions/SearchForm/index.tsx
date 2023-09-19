/* eslint-disable @typescript-eslint/no-misused-promises */
import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionContext } from "../../../contexts/transaction";
import { useContextSelector } from "use-context-selector";
// import { memo } from "react";

/*
  * Porque um componente renderiza?
    ! 1. Hook changed
    ! 2. Props changed
    ! 3. Parent rerendered

  * Qual o fluxo de renderização?
    ! 1. O react recria o HTML da interface daquele componente
    ! 2. Compara a versão do HTML recriado com a versão anterior
    ! 3. Se mudou alguma coisa, ele reescreve o HTML na tela

  * Memo:
    ! 0. Hooks changed, props changed (deep comparison)
    ! 1. Comparar com a ver~sao anterior dos hooks e props
    ! 2. Se mudou algo, ele permite a nova renderização
    ! 3. Entra no fluxo de renderização acima
*/

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionContext,
    (context) => {
      return context.fetchTransactions;
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query")}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={24} />
        Search
      </button>
    </SearchFormContainer>
  );
}

// export const SearchForm = memo(SearchFormComponent);
