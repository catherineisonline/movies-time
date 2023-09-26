import React from 'react'
import { Link } from 'react-router-dom'

const Upcoming = ({ upcomingMovies, getMovie, setDisabledMenu }) => {
  return (
    <section className="upcoming-movies-section">
      <h3>Upcoming movies</h3>
      <ul className="upcoming-movies">
        {upcomingMovies.map((movie) => (
          <li key={movie.id} className="upcoming-movie" onClick={() => setDisabledMenu(true)} >
            <Link
              onClick={() => { getMovie(movie.id); }}
              to={`/movies/${movie.title.toLowerCase().replace(/ /g, '-')}`}
            >
              <img
                alt={`${movie.title}`}
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              />
            </Link>
            <section className="upcoming-movie-meta">
              <h4>{movie.title}</h4>
              <p>{movie.release_date.slice(0, 4)}</p>
            </section>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Upcoming
