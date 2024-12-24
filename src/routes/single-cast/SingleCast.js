import './singleCast.css'
import React from 'react'
import { useEffect } from 'react'
import NoImageCover from '../../assets/images/no-image-two.png'
import NoImage from '../../assets/images/no-image.png'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
import { pageVariant } from '../homepage/Homepage'
import { FallbackImage } from '../../components/FallbackImage'

const SingleCast = ({ castDetails, actedIn, getMovie }) => {
  const {
    name,
    biography,
    known_for_department: knownFor,
    gender,
    birthday,
    place_of_birth: placeOfBirth,
    profile_path: profilePath,
  } = castDetails;
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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
        <FallbackImage
          alt={name}
          src={profilePath ? `https://image.tmdb.org/t/p/original/${profilePath}` : null}
          fallback={NoImage} />
        {/* cast name & bio */}
        <section>
          <h2>{name}</h2>
          <p>{biography}</p>
        </section>
        {/* cast personal info */}
        <section className='single-cast-personal-info'>
          <h3>Personal Info</h3>
          <section>
            <h4>Known for</h4>
            <p>{knownFor ? knownFor : 'N/A'}</p>
          </section>
          <section>
            <h4>Gender</h4>
            <p>{gender === 2 ? 'Male' : 'Female'}</p>
          </section>
          <section>
            <h4>Birthday</h4>
            <p>{birthday ? birthday : 'N/A'}</p>
          </section>
          <section>
            <h4>Place of birth</h4>
            <p>{placeOfBirth ? placeOfBirth : 'N/A'}</p>
          </section>
        </section>
        {/* cast acted in */}
        {actedIn && actedIn.length > 0 ? <section className="single-cast-acted-in">
          <h3>Acted in</h3>
          <ul className="single-cast-acted-in-movies">
            {actedIn.map(({ id, title, poster_path }) => (
              <li key={id} className="similar-movie">
                <Link
                  onClick={() => getMovie(id)}
                  to={`/movies/${title.toLowerCase().replace(/ /g, '-')}`}
                >
                  <FallbackImage
                    alt={title}
                    src={poster_path ? `https://image.tmdb.org/t/p/original/${poster_path}` : null}
                    fallback={NoImageCover} />
                </Link>
                <h5>{title}</h5>
              </li>
            ))}
          </ul>
        </section> : null}
      </section>
    </motion.main>
  )

}

export default SingleCast
