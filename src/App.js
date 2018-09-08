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
		this.state = {
			// Pagination Settings
			perPageFilter : 10,
			pageOffsetStart: 0,
			pageOffsetEnd: 0,

			// Filters
			userLikesFilter : false,
			userLikesNbFilter : 10,
			textFilter : '',

			// Data Obj
			data : data.data
		}
	}

	componentDidMount (){
		this.setState({
			pageOffsetStart: 0,
			pageOffsetEnd: this.state.perPageFilter
		});
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
		if( this.state.pageOffsetEnd >= this.state.data.length ) return false;
		this.setState((prevState) => {
			return {
				pageOffsetStart : prevState.pageOffsetStart + prevState.perPageFilter,
				pageOffsetEnd : prevState.pageOffsetEnd + prevState.perPageFilter,
			};
		});
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

	// Filter feed by descrption
	filterFeedByDesc = () => {
		let filteredFeedByDesc = data.data.filter((item)=>{
			return ( item.description !== null && item.description.toLowerCase().includes(this.state.textFilter));
		});
		this.setState({ data:filteredFeedByDesc });
	}

	// Sort feed by user likes
	sortFeedByUserLikes = (e) => {
		if( e.target.checked ){
			let filteredFeedByUserLikes = data.data.filter((item)=>{
				const likes = item.user.metadata.connections.likes.total;
				return ( likes!=null && likes > this.state.userLikesNbFilter );
			});
			this.setState({
				userLikesFilter : e.target.checked,
				data : filteredFeedByUserLikes
			});
		}else{
			this.setState({
				userLikesFilter : false,
				data : data.data
			});
		}
	}

	render() {
		return (
			<div className="container">
				<Form
					setTextFilter={this.setTextFilter}
					setPerPageFilter={this.setPerPageFilter}
					filterFeedByDesc={this.filterFeedByDesc}
					sortFeedByUserLikes={this.sortFeedByUserLikes}
				/>
				<Feed
					pageOffsetStart={this.state.pageOffsetStart}
					pageOffsetEnd={this.state.pageOffsetEnd}
					data={this.state.data}
				/>
				<Pagination 
					pageOffsetStart={this.state.pageOffsetStart}
					pageOffsetEnd={this.state.pageOffsetEnd}
					dataCount={this.state.data.length}
					prevPage={this.prevPage}
					nextPage={this.nextPage}
				/>
			</div>
		);
	}
}

export default App;
