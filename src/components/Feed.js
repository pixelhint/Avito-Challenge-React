import React from 'react';
import PropTypes from 'prop-types';

import FeedItem from './FeedItem';

const Feed = (props) => {
	const {
		data,
		pageOffsetStart,
		pageOffsetEnd
	} = props;
	const feedToShow = data.slice(pageOffsetStart, pageOffsetEnd);
	return(
		<div>
			{ feedToShow.length ?
				<div className="feed" id="feed">
					{feedToShow.map((item) => {
						return <FeedItem key={item.resource_key} item={item} />
					})}
				</div>
			: <div className="feed-item feed-msg" id="feed-msg"> No results </div> }
		</div>
	);
}

Feed.propTypes = {
	data: PropTypes.array.isRequired,
	pageOffsetStart: PropTypes.number.isRequired,
	pageOffsetEnd: PropTypes.number.isRequired,
};

export default Feed;