import React from 'react'
import './singleMovie.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ArrowRight from '../../assets/images/arrow-right.png'
import NoImage from '../../assets/images/no-image.png'

const SingleMovie = ({
  singleMovie,
  videosPreview,
  picturesPreview,
  videos,
  pictures,
  keywords,
  similarMovies,
  castPreview,
  cast,
  getMovie
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])
  return (
    <section className="single-movie">
      {singleMovie.backdrop_path ? (
        <img
          className="header-bg"
          alt=''
          src={`https://image.tmdb.org/t/p/original/${singleMovie.backdrop_path}`}
        />
      ) : null}

      <section className="single-movie-header">
        <img
           alt=''
          className="movie-cover"
          src={`https://image.tmdb.org/t/p/original/${singleMovie.cover}`}
        />
        <section className="header-description">
          <section className="title-section">
            <h3 className="title">
              {singleMovie.title} ({singleMovie.release_year})
            </h3>
            <p>{singleMovie.tagline}</p>

            <ul className="genres">
              {singleMovie.genres.map((genre) => (
                <li key={genre.name}>{genre.name}</li>
              ))}
            </ul>
          </section>
          <section className="voting">
            <h3 className="votes">{singleMovie.voteavg}</h3>
            <p>({singleMovie.votes} votes)</p>
          </section>
          {singleMovie && singleMovie.countries ? (
            <section>
              <h4>Production countries:</h4>
              <ul className="countries">
                {singleMovie.countries.map((country) => (
                  <li key={country.name}>{country.name}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </section>
        <section className="additional-info">
          <h4>
            Status: <span>{singleMovie.status}</span>
          </h4>
          <h4>
            Release date: <span> {singleMovie.release}</span>
          </h4>

          <h4>
            Duration: <span>{singleMovie.duration}</span>
          </h4>

          <h4>
            Budget: <span>${singleMovie.budget}</span>
          </h4>

          <h4>
            Revenue: <span>${singleMovie.revenue}</span>
          </h4>

          <h4>
            Language: <span>{singleMovie.original_lang}</span>
          </h4>
        </section>
      </section>

      <section className="overview">
        <section>
          <h3>Overview</h3>
          <p>{singleMovie.overview}</p>
        </section>
        {keywords && keywords.keyword.length > 0 ? (
          <ul>
            <h3>Tags: </h3>
            {keywords.keyword.map((keyword, index) => (
              <li key={index}>{keyword.name}</li>
            ))}
          </ul>
        ) : null}
      </section>
      {videos.size && videos.size > 0 ? (
        <section className="videos">
          <Link
            to={`/movies/${singleMovie.title
              .toLowerCase()
              .replace(/ /g, '-')}/videos`}
          >
            Watch videos ({videos.size})<img src={ArrowRight}    alt=''/>
          </Link>
          <section className="videos-preview-grid">
            {videosPreview.id.map((id) => (
              <iframe
                key={id.name}
                className="video-frame"
                src={`https://www.youtube.com/embed/${id.key}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={id.name}
              />
            ))}
          </section>
        </section>
      ) : null}
      {pictures.size && pictures.size > 0 ? (
        <section className="pictures">
          <Link
            to={`/movies/${singleMovie.title
              .toLowerCase()
              .replace(/ /g, '-')}/pictures`}
          >
            See pictures ({pictures.size})<img src={ArrowRight} />
          </Link>
          <section className="pictures-preview-grid">
            {picturesPreview.id.map((img, index) => (
              <img
                 alt=''
                width={450}
                key={index}
                className="pictures-preview"
                src={`https://image.tmdb.org/t/p/original/${img.file_path}`}
              />
            ))}
          </section>
        </section>
      ) : null}
      <section className="similar-movies-section">
        <h3>Similar movies</h3>
        <ul className="similar-movies">
          {similarMovies.map((movie) => (
            <li key={movie.id} className="similar-movie">
              <Link
                onClick={() => getMovie(movie.id)}
                to={`/movies/${movie.title.toLowerCase().replace(/ /g, '-')}`}
              >
                {movie.poster_path ? (
                  <img
                     alt=''
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  />
                ) : (
                  <img src={NoImage} />
                )}
              </Link>
              <h5>{movie.title}</h5>
            </li>
          ))}
        </ul>
      </section>
      {cast.length > 0 ? (
        <section className="cast-section">
          <Link
            to={`/cast/${singleMovie.title.toLowerCase().replace(/ /g, '-')}`}
          >
            See cast ({cast.length})<img src={ArrowRight} />
          </Link>
          <ul className="cast-preview-grid">
            {castPreview.map((person, index) => (
              <li key={index}>
                {person.profile_path ? (
                  <img
                    key={index}
                    className="cast-preview"
                    src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
                  />
                ) : (
                  <img key={index} className="cast-preview" src={NoImage} />
                )}
                <p>{person.name}</p>
                <em>{person.character}</em>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </section>
  )
}

export default SingleMovie
