import React from 'react'
import './homepage.css'

const Homepage = ({ allMovies, hero }) => {
  return (
    <main>
      {hero}
      <section className="all-movies">
        <h2>Top Rated Movies</h2>
        {allMovies}
      </section>
    </main>
  )
}

export default Homepage
