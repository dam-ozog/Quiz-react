import PropTypes from 'prop-types';

export const ReapetQuizButton = ({onClick}) => {
    return ( 
        <button className='btn glass mb-[15px]' onClick={onClick}>Powtórz Quiz</button>
     );
};

ReapetQuizButton.propTypes = {
    onClick: PropTypes.func.isRequired,
}
 
