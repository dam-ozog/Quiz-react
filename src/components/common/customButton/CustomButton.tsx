import { CustomButtonProps } from "../../../Types/Type";

export const CustomButton: React.FC<CustomButtonProps> = ({
	onClick,
	text,
	className,
	disabled,
	completed,
	type
}) => {
	if (completed) return null;
	return (
		<button className={className} onClick={onClick} disabled={disabled} type={type}>
		{text}
	</button>
	)
};
