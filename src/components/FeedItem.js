import React from 'react';
import PropTypes from 'prop-types';

const FeedItem = (props) => {
	const { item } = props;
	return(
		<div className="feed-item">
			<a className="feed-img" href={item.link} target="blank">
				<img src={item.user.pictures.sizes[1].link} alt={item.name}/>
			</a>
			<div className="feed-body">
				<h2 className="feed-title">
					<a href={item.link} target="blank">{item.name}</a>
					</h2>
				<p className="feed-description">{item.description}</p>
				<ul className="feed-stats">
					<li><strong>Plays: </strong>{item.stats.plays}</li>
					<li><strong>Comments: </strong>{item.metadata.connections.comments.total}</li>
					<li><strong>Likes: </strong>{item.metadata.connections.likes.total}</li>
				</ul>
			</div>
		</div>
	);
}

FeedItem.propTypes = {
	item:PropTypes.object.isRequired,
};

export default FeedItem;