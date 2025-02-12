import { ReturnButtonProps } from "../../Types/Type";

export const ReturnButton: React.FC<ReturnButtonProps> = ({
	onClick,
	text,
}) => {
	return (
		<button className='btn btn-outline' onClick={onClick}>
			{text}
		</button>
	);
};
