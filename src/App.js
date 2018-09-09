import React, { Component } from 'react';

// Components
import Form from './components/Form';
import Pagination from './components/Pagination';
import Feed from './components/Feed';

// Data Feed
import data from './data/dataFeed';

class App extends Component {
	constructor (props){
		super(props);
		const itemsToShow = 10;
		this.state = {
			// Pagination Settings
			perPageFilter : itemsToShow,
			pageOffsetStart: 0,
			pageOffsetEnd: itemsToShow,
			// Filters
			userLikesFilter : false,
			userLikesNbFilter : 2000,
			textFilter : '',
			// Data Obj
			data : data.data
		}
	}

	// Set number of items to show filter
	setPerPageFilter = (e) => {
		e.preventDefault();
		this.setState({
			perPageFilter : Number(e.target.value),
			pageOffsetStart : 0,
			pageOffsetEnd : Number(e.target.value),
		});
	}

	// Set text filter
	setTextFilter = (e) => {
		e.preventDefault();
		this.setState({
			textFilter : e.target.value.toLowerCase().trim()
		});
	}

	// Sort feed by user likes
	setUserLikesFilter = (e) => {
		if( e.target.checked ){
			this.setState({ userLikesFilter : e.target.checked });
		}else{
			this.setState({ userLikesFilter : false });
		}
	}

	// Set previous page state
	prevPage = () => {
		if( this.state.pageOffsetStart <= 0 ) return false;
		this.setState((prevState) => {
			return {
				pageOffsetStart : prevState.pageOffsetStart - prevState.perPageFilter,
				pageOffsetEnd : prevState.pageOffsetEnd - prevState.perPageFilter,
			};
		});
	}

	// Set next page state
	nextPage = () => {
		if( this.state.pageOffsetEnd >= this.filterFeed(this.state.data).length ) return false;
		this.setState((prevState) => {
			return {
				pageOffsetStart : prevState.pageOffsetStart + prevState.perPageFilter,
				pageOffsetEnd : prevState.pageOffsetEnd + prevState.perPageFilter,
			};
		});
	}

	filterFeed = (feed) => {
		return feed.filter((item)=>{
			const txtFilter = (item.description !== null && item.description.toLowerCase().includes(this.state.textFilter));
			const likesFilter = (this.state.userLikesFilter ? item.user.metadata.connections.likes.total!=null && item.user.metadata.connections.likes.total > this.state.userLikesNbFilter : true);
			return txtFilter && likesFilter;
		});
	}

	render() {
		return (
			<div className="container">
				<Form
					setTextFilter={this.setTextFilter}
					setPerPageFilter={this.setPerPageFilter}
					setUserLikesFilter={this.setUserLikesFilter}
				/>
				<Feed
					pageOffsetStart={this.state.pageOffsetStart}
					pageOffsetEnd={this.state.pageOffsetEnd}
					data={this.filterFeed(this.state.data)}
				/>
				<Pagination 
					pageOffsetStart={this.state.pageOffsetStart}
					pageOffsetEnd={this.state.pageOffsetEnd}
					dataCount={this.filterFeed(this.state.data).length}
					prevPage={this.prevPage}
					nextPage={this.nextPage}
				/>
			</div>
		);
	}
}

export default App;
