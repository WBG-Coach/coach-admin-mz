import React, { useEffect, useState } from "react";
import { Icon } from "../Icon";
import Select from "../Select";
import { Text } from "../Text";
import { StyledPaginatorButton, StyledPaginatorContainer } from "./styles";
import { PaginatorProps } from "./types";

const itensPerPageOption = [5, 10, 15, 20];
export const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  itemsPerPage,
  onChangeItemsPerPage,
  onChangePage,
  totalItems,
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / itemsPerPage));
  }, [itemsPerPage, totalItems]);

  return (
    <StyledPaginatorContainer>
      <Text
        mr="4px"
        fontSize={12}
        color="#757575"
        data-testid="text-items-per-page"
        value={"Itens por pagina:"}
      />

      <Select
        layout="small"
        value={itensPerPageOption.findIndex(
          (option) => option === itemsPerPage
        )}
        options={itensPerPageOption}
        data-testid="select-items-per-page"
        onChange={(option: number) => {
          onChangeItemsPerPage(option);
        }}
      />

      <Text
        ml="12px"
        fontSize={12}
        color="#757575"
        data-testid="text-current-and-total-pages"
        value={`Pagina ${currentPage + 1} de ${totalPages}`}
      />

      <StyledPaginatorButton
        disabled={currentPage === 0}
        data-testid="button-before-page"
        onClick={() => onChangePage(currentPage - 1)}
      >
        <Icon size={20} name="angle-left" color="#757575" />
      </StyledPaginatorButton>

      <StyledPaginatorButton
        data-testid="button-next-page"
        disabled={currentPage + 1 === totalPages}
        onClick={() => onChangePage(currentPage + 1)}
      >
        <Icon size={20} name="angle-right" color="#757575" />
      </StyledPaginatorButton>
    </StyledPaginatorContainer>
  );
};
