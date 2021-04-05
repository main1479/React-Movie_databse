import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

class Movies extends Component {
	state = {
		movies: getMovies(),
	};
	deleteMovie(movie) {
		const newState = this.state.movies.filter((m) => movie._id !== m._id);
		this.setState({ movies: newState });
	}
	render() {
		const {length: moviesLength} = this.state.movies
		if(moviesLength === 0) return (
			<h2 className="heading-2 mb-3 mt-3">There are no movies in database</h2>
		);
		return (
			<React.Fragment>
				<h2 className="heading-2 mb-3 mt-3">Showing {this.state.movies.length} movies from the Database</h2>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Title</th>
							<th scope="col">Genre</th>
							<th scope="col">Stock</th>
							<th scope="col">Rate</th>
						</tr>
					</thead>
					<tbody>
						{this.state.movies.map((movie) => {
							return (
								<tr key={movie._id}>
									<th scope="row">{movie.title}</th>
									<td>{movie.genre.name}</td>
									<td>{movie.numberInStock}</td>
									<td>{movie.dailyRentalRate}</td>
									<td>
										<button
											onClick={() => this.deleteMovie(movie)}
											className="btn btn-danger btn-sm"
										>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</React.Fragment>
		);
	}
}

export default Movies;
