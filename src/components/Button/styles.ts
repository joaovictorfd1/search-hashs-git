import styled from "styled-components";

export const StyledButton = styled.button<{ variant: string; fullWidth: boolean }>`
  display: inline-block;
  padding: 10px 16px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  /* Estilos baseados nas props */
  background-color: ${(props) =>
    props.variant === "primary" ? "#007bff" : "#6c757d"};
  color: ${(props) =>
    props.variant === "primary" ? "#fff" : "#fff"};
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};

  &:hover {
    background-color: ${(props) =>
      props.variant === "primary" ? "#0056b3" : "#5a6268"};
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }
`;