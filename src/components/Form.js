import React from 'react';
import PropTypes from 'prop-types';

const Form = (props) => {
	const {
		setPerPageFilter,
		setUserLikesFilter,
		setTextFilter
	} = props;
	return (
		<div className="feed-item feed-filter">
			<div className="feed-filter-item">
				<input type="text" name="txtFilter" placeholder="Looking for something?" className="feed-filter-input" onChange={setTextFilter}/>
			</div>
			<div className="feed-filter-item">
				<label htmlFor="items_to_show" className="feed-filter-input">Items to show: </label>
				<select className="feed-filter-input" onChange={setPerPageFilter}>
					<option value="10">10</option>
					<option value="25">25</option>
					<option value="50">50</option>
				</select>
			</div>
			<div className="feed-filter-item">
				<input type="checkbox" className="feed-filter-input" onChange={setUserLikesFilter}/>
				<label htmlFor="most_liked_users" className="feed-filter-input">> 10 likes users</label>
			</div>
		</div>
	);
}

Form.propTypes = {
	setTextFilter:PropTypes.func.isRequired,
	setPerPageFilter:PropTypes.func.isRequired,
	setUserLikesFilter:PropTypes.func.isRequired,
};

export default Form;