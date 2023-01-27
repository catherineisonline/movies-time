import React from 'react'
import './singleMovie.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ArrowRight from '../../assets/images/arrow-right.png'

const SingleMovie = ({
  singleMovie,
  videosPreview,
  picturesPreview,
  videos,
  pictures,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])
  return (
    <section className="single-movie">
      <img
        className="header-bg"
        src={`https://image.tmdb.org/t/p/original/${singleMovie.backdrop_path}`}
      />
      <section className="single-movie-header">
        <img
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
          <section>
            <ul className="countries">
              {singleMovie.countries.map((country) => (
                <li key={country.name}>Production countries: {country.name}</li>
              ))}
            </ul>
          </section>
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
        <h3>Overview</h3>
        <p>{singleMovie.overview}</p>
      </section>
      <section className="videos">
        <Link
          to={`/movies/${singleMovie.title
            .toLowerCase()
            .replace(/ /g, '-')}/videos`}
        >
          Watch videos ({videos.size})<img src={ArrowRight} />
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
              width={450}
              key={index}
              className="pictures-preview"
              src={`https://image.tmdb.org/t/p/original/${img.file_path}`}
            />
          ))}
        </section>
      </section>
    </section>
  )
}

export default SingleMovie
