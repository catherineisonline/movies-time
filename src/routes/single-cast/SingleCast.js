import React from 'react'
import { useEffect } from 'react'
import './singleCast.css'
import NoImageCover from '../../assets/images/no-image-two.png'
import NoImage from '../../assets/images/no-image.png'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
import { pageVariant } from '../homepage/Homepage'

const SingleCast = ({ castDetails, actedIn, getMovie }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])
  return (
    <motion.main
      variants={pageVariant}
      initial="initial"
      animate="visible"
      exit="exit"
      className='single-cast' >
      <section className='single-cast-section'>
        {/* cast image */}
        {castDetails.profile_path ? <img alt={castDetails.name} src={`https://image.tmdb.org/t/p/original/${castDetails.profile_path}`} /> :
          <img src={NoImage} alt='' aria-hidden="true" />
        }

        {/* cast name & bio */}
        <section>
          <h2>{castDetails.name}</h2>
          <p>{castDetails.biography}</p>
        </section>
        {/* cast personal info */}
        <section className='single-cast-personal-info'>
          <h3>Personal Info</h3>
          <section>
            <h4>Known for</h4>
            <p>{castDetails.known_for_department ? castDetails.known_for_department : 'N/A'}</p>
          </section>
          <section>
            <h4>Gender</h4>
            <p>{castDetails.gender === 2 ? 'Male' : 'Female'}</p>
          </section>
          <section>
            <h4>Birthday</h4>
            <p>{castDetails.birthday ? castDetails.birthday : 'N/A'}</p>
          </section>
          <section>
            <h4>Place of birth</h4>
            <p>{castDetails.place_of_birth ? castDetails.place_of_birth : 'N/A'}</p>
          </section>
        </section>

        {/* cast acted in */}
        {actedIn && actedIn.length > 0 ? <section className="single-cast-acted-in">
          <h3>Acted in</h3>
          <ul className="single-cast-acted-in-movies">
            {actedIn.map((movie) => (
              <li key={movie.id} className="similar-movie">
                <Link
                  onClick={() => getMovie(movie.id)}
                  to={`/movies/${movie.title.toLowerCase().replace(/ /g, '-')}`}
                >
                  {movie.poster_path ? (
                    <img
                      alt={`${movie.title}`}
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    />
                  ) : (
                    <img src={NoImageCover} alt='' aria-hidden="true" />
                  )}
                </Link>
                <h5>{movie.title}</h5>
              </li>
            ))}
          </ul>
        </section> : null}
      </section>
    </motion.main>
  )

}

export default SingleCast
