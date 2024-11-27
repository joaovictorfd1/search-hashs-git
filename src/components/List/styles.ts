import styled from "styled-components";

// Estilizando a lista ordenada com Styled Components
export const StyledOrderedList = styled.ol`
  list-style-type: none; // Usa números para lista ordenada
  padding-left: 20px; // Espaçamento à esquerda
  overflow-y: auto; // Adiciona uma rolagem se o conteúdo exceder o tamanho máximo
  margin: 0;
`;

export const StyledListItem = styled.li`
  margin: 8px 0; // Espaçamento entre os itens da lista
  font-size: 16px; // Tamanho de fonte
`;