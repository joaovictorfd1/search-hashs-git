import { StyledSelect } from "./styles";


interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({ options, placeholder = "Selecione...", ...props }) => {
  return (
    <StyledSelect name="select_repository" {...props}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;