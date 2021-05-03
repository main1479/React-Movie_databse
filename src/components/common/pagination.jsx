import React from 'react';
import _ from 'lodash';
import propTypes from 'prop-types';

const Pagination = (props) => {
	const { totalItems, pageSize, currentPage, onPageChange } = props;
	const pagesCount = Math.ceil(totalItems / pageSize);
	if (pagesCount === 1) return null;
	const pages = _.range(1, pagesCount + 1);

	return (
		<nav>
			<ul className="pagination">
				{pages.map((page) => {
					return (
						<li key={page} className={currentPage === page ? 'page-item active' : 'page-item'}>
							<button className="page-link" onClick={() => onPageChange(page)}>
								{page}
							</button>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

Pagination.propTypes = {
	totalItems: propTypes.number.isRequired,
	pageSize: propTypes.number.isRequired,
	currentPage: propTypes.number.isRequired,
	onPageChange: propTypes.func.isRequired,
};
export default Pagination;
