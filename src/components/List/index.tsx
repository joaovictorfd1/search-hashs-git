import { StyledListItem, StyledOrderedList } from "./styles";

interface OrderedListProps {
  items: string[]; // Lista de itens a ser exibida
  maxItems?: number; // Quantidade máxima de itens visíveis
}

const OrderedList: React.FC<OrderedListProps> = ({ items, maxItems = 100 }) => {
  const displayedItems = maxItems ? items.slice(0, maxItems) : items;

  return (
    <StyledOrderedList>
      {displayedItems.map((item, index) => (
        <StyledListItem key={index}>{item}</StyledListItem>
      ))}
    </StyledOrderedList>
  );
};

export default OrderedList;