import React from 'react';
import PropTypes from 'prop-types';

const Pagination = (props) => {
	const {
		pageOffsetStart,
		pageOffsetEnd,
		dataCount,
		prevPage,
		nextPage
	} = props;
	return(
		<div className="feed-pagination" id="feed-pagination">
			<input 
				type="button" 
				value="Previous" 
				id="previous" 
				className={`feed-pagination-btn half ${pageOffsetStart <= 0 ? 'disabled': ''}`}
				onClick={prevPage}
			/>
			<input 
				type="button" 
				value="Next" 
				id="next" 
				className={`feed-pagination-btn half " + ${pageOffsetEnd >= dataCount ? 'disabled': ''}`}
				onClick={nextPage}
			/>
		</div>
	);
}

Pagination.propTypes = {
	pageOffsetStart:PropTypes.number.isRequired,
	pageOffsetEnd:PropTypes.number.isRequired,
	prevPage:PropTypes.func.isRequired,
	nextPage:PropTypes.func.isRequired,
};

export default Pagination;