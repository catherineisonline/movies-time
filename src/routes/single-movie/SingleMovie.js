import React from 'react'

const SingleMovie = ({ singleMovie }) => {
  return (
    <section>
      <img src={`https://image.tmdb.org/t/p/original/${singleMovie.cover}`} />
      <section>
        <h3>
          {singleMovie.title} ({singleMovie.release_year})
        </h3>
        <p>{singleMovie.tagline}</p>

        <ul>
          {singleMovie.genres.map((genre) => (
            <li key={genre.name}>{genre.name}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3>{singleMovie.voteavg}</h3>
        <p>({singleMovie.votes} votes)</p>
      </section>
      <section>
        <ul>
          {singleMovie.countries.map((country) => (
            <li key={country.name}>
              {country.name}, {singleMovie.release}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Overview</h3>
        <p>{singleMovie.overview}</p>
      </section>
      <section>
        <p>
          Duration: <span>{singleMovie.duration}</span>
        </p>
        <p>
          Budget: <span>{singleMovie.budget}</span>
        </p>
        <p>
          Revenue: <span>{singleMovie.revenue}</span>
        </p>
        <p>
          Original Language: <span>{singleMovie.original_lang}</span>
        </p>
      </section>
    </section>
  )
}

export default SingleMovie
