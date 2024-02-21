import React from 'react'
import './singleMovie.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ArrowRight from '../../assets/images/arrow-right.png'
import NoImage from '../../assets/images/no-image.png'
import NoImageCover from '../../assets/images/no-image-two.png'
import { motion } from "framer-motion";

const singlePageVariant = {
  initial: {
    x: "100vw"
  },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      delay: 0.5
    }
  },
  exit: {
    x: "-100vw",
    transition: {
      ease: "easeInOut"
    }
  },

}

const sectionVariant = {
  initial: {
    x: "100vw"
  },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 40,
      delay: 0.5
    }
  }
}

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
  getMovie,
  getCastDetails
}) => {

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [])
  return (
    <motion.main
      variants={singlePageVariant}
      initial="initial"
      animate="visible"
      exit="exit"
      className="single-movie"
    >
      {singleMovie.backdrop_path ? (
        <img
          className="header-bg"
          alt='' aria-hidden="true"
          src={`https://image.tmdb.org/t/p/original/${singleMovie.backdrop_path ? singleMovie.backdrop_path : singleMovie.cover}`}
        />
      ) : <img
        className="header-bg"
        alt='' aria-hidden="true"
        src={NoImageCover}
      />
      }

      <section className="single-movie-header"

      >
        {singleMovie.backdrop_path ?
          <motion.img
            whileTap={{ scale: 1.5, y: "-10rem" }}
            alt='' aria-hidden="true"
            className="movie-cover"
            src={`https://image.tmdb.org/t/p/original/${singleMovie.cover ? singleMovie.cover : singleMovie.backdrop_path}`}
          /> :
          <motion.img
            whileTap={{ scale: 1.5, y: "-10rem" }}
            className="header-bg"
            alt='' aria-hidden="true"
            src={NoImageCover}
          />}
        <section className="header-description">
          <section className="title-section">
            <h3 className="title">
              {singleMovie.title} {singleMovie.release_year?.length !== 0 ? `(${singleMovie.release_year})` : null}
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
          {singleMovie && singleMovie.countries && singleMovie.countries?.length > 0 ? (
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
        <section className="additional-info" >
          <h4>
            Status: {singleMovie.status ? <span>{singleMovie.status}</span> : <span>N/A</span>}
          </h4>
          <h4>
            Release date:  {singleMovie.release ? <span>{singleMovie.release}</span> : <span>N/A</span>}
          </h4>

          <h4>
            Duration: {singleMovie.duration ? <span>{singleMovie.duration} mins</span> : <span>N/A</span>}
          </h4>

          <h4>
            Budget: {singleMovie.budget ? <span>${singleMovie.budget}</span> : <span>N/A</span>}
          </h4>

          <h4>
            Revenue: {singleMovie.revenue ? <span>${singleMovie.revenue}</span> : <span>N/A</span>}
          </h4>

          <h4>
            Language: {singleMovie.original_lang ? <span>{singleMovie.original_lang}</span> : <span>N/A</span>}
          </h4>
        </section>
      </section>

      <section
        className="overview">
        {singleMovie.overview ?
          <section>
            <h3>Overview</h3>
            <p>{singleMovie.overview}</p>
          </section> :
          <section>No review available</section>}
        {keywords && keywords.keyword?.length > 0 ? (
          <ul>
            <h3>Tags: </h3>
            {keywords.keyword.map((keyword, index) => (
              <li key={index}>{keyword.name}</li>
            ))}
          </ul>
        ) : null}
      </section>
      {videos.size && videos.size > 0 ? (
        <motion.section
          className="videos"
          variants={sectionVariant}
          whileInView="visible"
          initial="initial"
        >
          <Link
            to={`/movies/${singleMovie.title
              .toLowerCase()
              .replace(/ /g, '-')}/videos`}>
            Watch videos ({videos.size})<img src={ArrowRight} alt='' aria-hidden="true" />
          </Link>
          <section
            className="videos-preview-grid"
          >
            {videosPreview.id.map((id) => (
              <iframe
                key={id.name}
                className="video-frame"
                src={`https://www.youtube.com/embed/${id.key}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={id.name}
                sandbox="allow-scripts allow-same-origin allow-forms allow-presentation"
                loading="lazy"
              />
            ))}
          </section>
        </motion.section>
      ) : null
      }
      {
        pictures.size && pictures.size > 0 ? (
          <motion.section
            className="pictures"
            variants={sectionVariant}
            whileInView="visible"
            initial="initial"
          >
            <Link
              to={`/movies/${singleMovie.title
                .toLowerCase()
                .replace(/ /g, '-')}/pictures`}
            >
              See pictures ({pictures.size})<img alt='' aria-hidden="true" src={ArrowRight} />
            </Link>
            <section className="pictures-preview-grid">
              {picturesPreview.id.map((img, index) => (
                <img
                  alt={`${singleMovie.title}`}
                  key={index}
                  className="pictures-preview"
                  src={`https://image.tmdb.org/t/p/original/${img.file_path}`}
                />
              ))}
            </section>
          </motion.section>
        ) : null
      }
      {
        similarMovies && similarMovies?.length > 0 ?
          <motion.section className="similar-movies-section"
            variants={sectionVariant}
            whileInView="visible"
            initial="initial"

          >
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
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path ? movie.poster_path : movie.backdrop_path}`}
                      />
                    ) : (
                      <img src={NoImage} alt='' aria-hidden="true" />
                    )}
                  </Link>
                  <h5>{movie.title}</h5>
                </li>
              ))}
            </ul>
          </motion.section> : null
      }

      {cast.length > 0 ? (
        <motion.section
          variants={sectionVariant}
          whileInView="visible"
          initial="initial"
          className="cast-section">
          <Link
            className='cast-preview-grid-link'
            to={`/cast/${singleMovie.title.toLowerCase().replace(/ /g, '-')}`}
          >
            See cast ({cast?.length})<img src={ArrowRight} alt='' aria-hidden="true" />
          </Link>
          <ul className="cast-preview-grid">
            {castPreview.map((person, index) => (
              <li key={index}>
                <Link

                  onClick={() => getCastDetails(person.id)}
                  to={`/actors/${person.name.toLowerCase().replace(/ /g, '-')}`}
                >
                  {person.profile_path ? (
                    <img
                      key={index}
                      className="cast-preview"
                      src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
                      alt={`${person.name}`}
                    />
                  ) : (
                    <img key={index} className="cast-preview" src={NoImage} alt='' aria-hidden="true" />
                  )}
                  <h5>{person.name}</h5>
                  <p>{person.character}</p>
                </Link>
              </li>
            ))}
          </ul>
        </motion.section>
      ) : null
      }
    </motion.main>
  )
}

export default SingleMovie
