import { StyledButton } from "./styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string; // Texto exibido no botão
  variant?: "primary" | "secondary"; // Variantes de estilo (opcional)
  fullWidth?: boolean; // Define se o botão ocupa 100% da largura do contêiner
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  fullWidth = false,
  ...props
}) => {
  return (
    <StyledButton variant={variant} fullWidth={fullWidth} {...props}>
      {label}
    </StyledButton>
  );
};

export default Button;