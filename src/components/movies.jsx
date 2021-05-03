import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		sortColumn: { path: 'title', order: 'asc' },
	};

	componentDidMount() {
		const genres = [{ name: 'All Movies' }, ...getGenres()];
		this.setState({ movies: getMovies(), genres });
	}
	handleDelete = (movie) => {
		console.log(movie);
		const newState = this.state.movies.filter((m) => movie._id !== m._id);
		this.setState({ movies: newState });
	};
	handleLike = (movie) => {
		const movies = this.state.movies.map((m) => {
			if (m._id === movie._id) movie.liked = !movie.liked;
			return m;
		});

		this.setState({ movies });
	};

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};
	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};

	handleSort = sortColumn => {
		this.setState({ sortColumn });
	};
	render() {
		const { length: moviesLength } = this.state.movies;
		const { currentPage, pageSize, movies: allMovies, selectedGenre, sortColumn } = this.state;

		const filtered =
			selectedGenre && selectedGenre._id
				? allMovies.filter((m) => m.genre._id === selectedGenre._id)
				: allMovies;

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const movies = paginate(sorted, currentPage, pageSize);

		if (moviesLength === 0)
			return <h2 className="heading-2 mb-3 mt-5">There are no movies in database</h2>;
		return (
			<React.Fragment>
				<h2 className="heading-2 mb-3 mt-3 text-center">
					Showing {filtered.length} movies from the Database
				</h2>
				<div className="row pt-3">
					<div className="col-md-3 mb-5">
						<ListGroup
							items={this.state.genres}
							selectedItem={this.state.selectedGenre}
							onItemSelect={this.handleGenreSelect}
						/>
					</div>
					<div className="col">
						<MoviesTable
							movies={movies}
							onSort={this.handleSort}
							onDelete={this.handleDelete}
							onLike={this.handleLike}
							sortColumn={sortColumn}
						/>
						<Pagination
							totalItems={filtered.length}
							pageSize={pageSize}
							currentPage={currentPage}
							onPageChange={this.handlePageChange}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Movies;
