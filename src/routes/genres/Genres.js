import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
const Genres = ({ genreListMovies, currentGenre, PaginatedItems }) => {
  return (
    <section>
      <h2>{currentGenre}</h2>
      <ul className="homepage-movies">
        {genreListMovies.map((movie) => (
          <li key={movie.id} className="homepage-movie">
            <Link
              to={`/movies/${movie.title.toLowerCase().replace(/ /g, '-')}`}
            >
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              />
            </Link>
            <section className="homepage-movie-meta">
              <h3>{movie.title}</h3>
              <section className="homepage-movie-meta-title">
                <p>{movie.release_date.slice(0, 4)}</p>
                <p className="avg-rating">{movie.vote_average}</p>
              </section>
            </section>
          </li>
        ))}
      </ul>
      {PaginatedItems}
    </section>
  )
}

export default Genres
