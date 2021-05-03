import React, { Component } from 'react';
import Like from './common/like';
import TableBody from './common/tableBody';
import TableHeader from './common/tableHeader';

class MoviesTable extends Component {
	columns = [
		{ path: 'title', label: 'Title' },
		{ path: 'genre.name', label: 'Genre' },
		{ path: 'numberInStock', label: 'Stock' },
		{ path: 'dailyRentalRate', label: 'Rate' },
		{
			key: 'like',
			content: (movie) => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />,
		},
		{
			key: 'delete',
			content: (movie) => (
				<button onClick={() => this.props.onDelete(movie)} className="btn btn-danger btn-sm">
					Delete
				</button>
			),
		},
	];

	render() {
		const { movies, onSort, sortColumn } = this.props;
		return (
			<table className="table">
				<TableHeader onSort={onSort} sortColumn={sortColumn} columns={this.columns} />

				<TableBody columns={this.columns} data={movies} />
			</table>
		);
	}
}

export default MoviesTable;
