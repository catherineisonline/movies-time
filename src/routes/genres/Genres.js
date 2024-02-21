import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './genres.css'
import { motion } from 'framer-motion'
import { pageVariant } from '../homepage/Homepage'

const Genres = ({
  genreListMovies,
  currentGenre,
  PaginatedItems,
  getMovie,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, []);


  return (
    <motion.main
      variants={pageVariant}
      initial="initial"
      animate="visible"
      exit="exit"
      className="genres-route" >
      <h2>{currentGenre}</h2>
      <ul className="genres-grid">

        {genreListMovies.map((movie) => (
          <motion.li key={movie.id} className="homepage-movie" whileHover={{ scale: 1.1 }}>

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
          </motion.li>
        ))}
      </ul>
      {genreListMovies.length === 0 ? <p>Sorting by genres is currently unavailable. Please check the API or contact the website owner.</p> : PaginatedItems}
    </motion.main>
  )
}

export default Genres
