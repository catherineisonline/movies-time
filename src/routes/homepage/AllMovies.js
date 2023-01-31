import React from 'react'
import { Link } from 'react-router-dom'

const AllMovies = ({ movieList, PaginatedItems, getMovie }) => {
  return (
    <section>
      <ul className="homepage-movies">
        {movieList.map((movie) => (
          <li key={movie.id} className="homepage-movie">
            <Link
              onClick={() => getMovie(movie.id)}
              to={`/movies/${movie.title.toLowerCase().replace(/ /g, '-')}`}
            >
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              />
            </Link>
            <section className="homepage-movie-meta">
              <h3 className="movie-title">{movie.title}</h3>
              <section className="homepage-movie-meta-title">
                <p>{movie.release_date.slice(0, 4)}</p>
                <h3 className="avg-rating">{movie.vote_average}</h3>
              </section>
            </section>
          </li>
        ))}
      </ul>
      {PaginatedItems}
    </section>
  )
}

export default AllMovies
