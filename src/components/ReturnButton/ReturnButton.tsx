import { ReturnButtonProps } from "../../Types/Type";

export const ReturnButton: React.FC<ReturnButtonProps> = ({
	onClick,
	text,
}) => (
	<button className='btn btn-outline' onClick={onClick}>
		{text}
	</button>
);
