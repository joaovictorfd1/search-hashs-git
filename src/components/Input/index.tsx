import { StyledInput } from "./styles";

interface IInput {
  placeholder: string;
}

const Input = ({ placeholder }: IInput) => {
  return <StyledInput name="input_hashs" placeholder={placeholder} />;
};

export default Input;