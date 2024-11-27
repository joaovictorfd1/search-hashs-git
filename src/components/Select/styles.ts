import styled from "styled-components";

export const StyledSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: #007bff;
    outline: none;
  }

  &:hover {
    border-color: #0056b3;
  }
`;