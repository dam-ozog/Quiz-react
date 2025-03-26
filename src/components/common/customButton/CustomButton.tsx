import { CustomButtonProps } from "../../../Types/Type";

export const CustomButton: React.FC<CustomButtonProps> = ({
	onClick,
	text,
	className,
	disabled,
	completed,
	type
}) => {
	return (
		<button className={className} onClick={onClick} disabled={disabled} type={type}>
		{text}
	</button>
	)
};
