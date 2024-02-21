import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const movieCardVariant = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }

}

const AllMovies = ({ movieList, PaginatedItems, getMovie }) => {
  return (
    <React.Fragment>
      <motion.ul className="homepage-movies">
        {movieList.map((movie) => (
          <motion.li variants={movieCardVariant} whileHover="hover" key={movie?.id} className="homepage-movie">
            <Link
              onClick={() => { getMovie(movie.id); }}
              to={`/movies/${movie?.title?.toLowerCase().replace(/ /g, '-')}`}
            >
              <img
                alt={`${movie.title}`}
                src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
              />
            </Link>
            <section className="homepage-movie-meta">
              <h3 className="movie-title">{movie?.title}</h3>
              <section className="homepage-movie-meta-title">
                <p>{movie?.release_date.slice(0, 4)}</p>
                <h3 className="all-movies-rating">{movie?.vote_average}</h3>
              </section>
            </section>
          </motion.li>
        ))}
      </motion.ul>
      {PaginatedItems}
    </React.Fragment>
  )
}

export default AllMovies
