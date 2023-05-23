import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './genres.css'
import { motion } from 'framer-motion'

const Genres = ({
  genreListMovies,
  currentGenre,
  PaginatedItems,
  getMovie,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])
  return (
    <main className="genres-route" >
      <h2>{currentGenre}</h2>
      <ul className="genres-grid">
        {genreListMovies.map((movie) => (
          <motion.div whileHover={{ scale: 1.1 }}>
            <li key={movie.id} className="homepage-movie">
              <Link
                onClick={() => getMovie(movie.id)}
                to={`/movies/${movie.title.toLowerCase().replace(/ /g, '-')}`}
              >
                <img
                  alt={`${movie.title}`}
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                />
              </Link>
              <section className="homepage-movie-meta">
                <h3 className="movie-title">{movie.title}</h3>
                <section className="homepage-movie-meta-title">
                  <p>{movie.release_date.slice(0, 4)}</p>
                  <h3 className="all-movies-rating">{movie.vote_average}</h3>
                </section>
              </section>
            </li>
          </motion.div>
        ))}
      </ul>
      {PaginatedItems}
    </main>
  )
}

export default Genres
