import { BaseButton, AddButton, DeleteButton } from "../styles/buttons.styles";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  add: "add",
  delete: "delete",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.add]: AddButton,
    [BUTTON_TYPE_CLASSES.delete]: DeleteButton,
  }[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </CustomButton>
  );
};
export default Button;
