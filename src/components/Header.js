import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './header.css'
import Upcoming from './Upcoming'
import ChevronLight from '../assets/images/chevron-light.png'
import WebIcon from '../assets/images/website-icon-dark.png'
import GitLight from '../assets/images/github-dark.png'
import MovieLight from '../assets/images/movie-light.png'
import { motion } from "framer-motion"


const genreVariant = {
  initial: {
    x: "-100vw",
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50
    }
  }
}

const Header = ({
  genreList,
  setGenreId,
  setCurrentGenre,
  getMovie,
  disabled,
  setDisabled
}) => {
  const [upcomingMovies, setUpcomingMovies] = useState([])

  const [enabled, setEnabled] = useState(false)
  const toggleGenres = () => {
    enabled ? setEnabled(false) : setEnabled(true)
  }
  const getUpcoming = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=b71bcab3d07039b32d23c21d747e9d40&language=en-US&page=1`);
      const data = await response.json();
      setUpcomingMovies([...data.results].slice(0, 6))
    }
    catch (err) {
      console.log("Error in getUpcoming:", err)
    }
  }
  useEffect(() => {
    getUpcoming()
  }, [])
  return (
    <React.Fragment>
      {!disabled ? (
        <motion.nav
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.5 }}
          className="sidebar"
        >
          <nav >
            <ul className="sidebar-menu">
              <li>
                <NavLink to="/" onClick={() => setDisabled(true)}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="about" onClick={() => setDisabled(true)}>
                  About
                </NavLink>
              </li>
              <li>
                {enabled ? (
                  <button onClick={toggleGenres} className=" enabled-chevron">
                    Genres <img alt="toggle off genres menu button" src={ChevronLight} />
                  </button>
                ) : (
                  <button onClick={toggleGenres} className='chevron'>
                    Genres <img alt="toggle genres menu button" src={ChevronLight} />
                  </button>
                )}
              </li>
            </ul>
            {enabled ? (
              <motion.ul
                variants={genreVariant}
                initial="initial"
                animate="visible"
                className="genres-menu">
                {genreList.map((genre) => (
                  <li key={genre.id}>
                    <NavLink
                      onClick={() => {
                        setGenreId(genre.id)
                        setCurrentGenre(genre.name)
                        setDisabled(true)
                        setEnabled(false)
                      }}
                      to={`/genres/${genre.name.toLowerCase()}`}
                    >
                      {genre.name}
                    </NavLink>
                  </li>
                ))}
              </motion.ul>

            ) : null}
          </nav>
          <section className="nav-socials">
            <a rel="noreferrer" target="_blank" href="https://ekaterine-mitagvaria.vercel.app/">
              <img src={WebIcon} alt='Vercel icon' className='web-icon' />
            </a>
            <a rel="noreferrer" target="_blank" href="https://github.com/catherineisonline/movies-time">
              <img src={GitLight} alt='Github icon' />
            </a>
            <a rel="noreferrer" target="_blank" href="https://developers.themoviedb.org/4/getting-started/authorization">
              <img src={MovieLight} alt='Movie API icon' />
            </a>
          </section>
          <Upcoming upcomingMovies={upcomingMovies} getMovie={getMovie} setDisabled={setDisabled} />
        </motion.nav>
      ) : <motion.nav
        animate={{ opacity: 0, x: "-100%" }}
        initial={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "-100%" }}
        transition={{ duration: 1 }}
        className="sidebar"
      >
        <nav>
          <ul className="sidebar-menu">
            <li>
              <NavLink to="/" onClick={() => setDisabled(true)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="about" onClick={() => setDisabled(true)}>
                About
              </NavLink>
            </li>
            <li>
              {enabled ? (
                <button onClick={toggleGenres} className="enabled-chevron">
                  Genres <img src={ChevronLight} alt="toggle off genres menu button" />
                </button>
              ) : (
                <button onClick={toggleGenres}>
                  Genres <img src={ChevronLight} alt="toggle genres menu button" />
                </button>
              )}
            </li>
          </ul>
          {enabled ? (
            <ul className="genres-menu">
              {genreList.map((genre) => (
                <li key={genre.id}>
                  <NavLink
                    onClick={() => {
                      setGenreId(genre.id)
                      setCurrentGenre(genre.name)
                      setDisabled(true)
                      setEnabled(false)
                    }}
                    to={`/genres/${genre.name.toLowerCase()}`}
                  >
                    {genre.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : null}
        </nav>
        <section className="nav-socials">
          <a rel="noreferrer" target="_blank" href="https://ekaterine-mitagvaria.vercel.app/">
            <img src={WebIcon} alt='Vercel icon' />
          </a>
          <a rel="noreferrer" target="_blank" href="https://github.com/catherineisonline/movies-time">
            <img src={GitLight} alt='Github icon' />
          </a>
          <a rel="noreferrer" target="_blank" href="https://developers.themoviedb.org/4/getting-started/authorization">
            <img src={MovieLight} alt='Movie API icon' />
          </a>
        </section>

        <Upcoming upcomingMovies={upcomingMovies} getMovie={getMovie} setDisabled={setDisabled} />
      </motion.nav>}
    </React.Fragment>
  )
}

export default Header
