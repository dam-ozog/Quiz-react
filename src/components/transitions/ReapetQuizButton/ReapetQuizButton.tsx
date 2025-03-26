
import { RepeatQuizButtonProps } from '../../../Types/Type'
export const ReapetQuizButton: React.FC<RepeatQuizButtonProps> = ({onClick}) => {
    return ( 
        <button className='btn glass mb-[15px]' onClick={onClick}>Powtórz Quiz</button>
     );
};
 
