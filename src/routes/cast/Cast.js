import React from 'react'
import './cast.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import NoImage from '../../assets/images/no-image.png'
import { motion } from 'framer-motion'
import { pageVariant } from '../homepage/Homepage'


const Cast = ({ cast, getCastDetails }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])
  return (
    <motion.main
      variants={pageVariant}
      initial="initial"
      animate="visible"
      exit="exit"
      className="cast-route" >
      <h2>Cast</h2>
      <section className="cast-grid">
        {cast.map((person, index) => (
          <motion.div whileHover={{ scale: 1.1 }} key={index}>
            <Link
              onClick={() => getCastDetails(person.id)}
              className="cast-grid-item"
              to={`/actors/${person.name.toLowerCase().replace(/ /g, '-')}`}
            >
              {person.profile_path ? (
                <img
                  key={index}
                  alt={`${person.name}`}
                  src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
                />
              ) : (
                <img alt='' aria-hidden='true' key={index} src={NoImage} />
              )}

              <section className="cast-grid-item-desc">
                <p>{person.name}</p>
                <em>{person.character}</em>
              </section>
            </Link>
          </motion.div>
        ))}
      </section>
    </motion.main>
  )
}

export default Cast
