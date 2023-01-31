import React from 'react'
import './cast.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Cast = ({ cast, singleMovie }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])
  return (
    <main className="cast-route">
      <h2>Cast</h2>
      <section className="cast-grid">
        {cast.map((person, index) => (
          <section className="cast-grid-item" key={index}>
            <Link
              to={`/actors/${person.name.toLowerCase().replace(/ /g, '-')}`}
            >
              <img
                key={index}
                className="cast-preview"
                src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
              />
            </Link>
            <section className="cast-grid-item-desc">
              <p>{person.name}</p>
              <em>{person.character}</em>
            </section>
          </section>
        ))}
      </section>
    </main>
  )
}

export default Cast
