import PropTypes from 'prop-types';

export const ReapetQuizButton = ({onClick}) => {
    return ( 
        <button onClick={onClick}>Powtórz Quiz</button>
     );
};

ReapetQuizButton.propTypes = {
    onClick: PropTypes.func.isRequired,
}
 
