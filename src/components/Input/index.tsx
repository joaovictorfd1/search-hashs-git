import { StyledInput } from "./styles";

interface IInput {
  placeholder: string;
  name: string;
  id: string;
  type: 'text' | 'password'
}

const Input = ({ placeholder, name, id, type }: IInput) => {
  return <StyledInput name={name} id={id} type={type} placeholder={placeholder} />;
};

export default Input;