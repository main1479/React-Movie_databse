import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

class Movies extends Component {
	state = {
		movies: getMovies(),
	};
	render() {
		return (
			<div className="mt-5">
				<h2 className="heading-2">
					There is {this.state.movies.length === 0 ? 'no' : this.state.movies.length} Movies
				</h2>

				{this.state.movies.length === 0 ? (
					''
				) : (
					<table className="table mt-5">
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
												data-id={movie._id}
												onClick={() => this.deleteMovie(movie)}
												className="btn btn-danger"
											>
												Delete
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				)}
			</div>
		);
	}

	deleteMovie = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies: movies });
	};
}

export default Movies;
