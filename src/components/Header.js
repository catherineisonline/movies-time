import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './header.css'
import Upcoming from './Upcoming'
import ChevronLight from '../assets/images/chevron-light.png'
import WebIcon from '../assets/images/website-icon-dark.png'
import GitLight from '../assets/images/github-dark.png'
import MovieLight from '../assets/images/movie-light.png'
import { AnimatePresence, motion } from "framer-motion"


const menuVariant = {
  initial: {
    x: "-100vw",
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 20,
      duration: 1
    }
  },
  exit: {
    x: "-100vw",
    opacity: 0,
    transition: {
      delay: 0.1,
      duration: 3
    }
  }
}

const Header = ({
  genreList,
  getMovie,
  disabledMenu,
  setDisabledMenu,
  findByGenres
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

    <AnimatePresence mode="wait">
      {!disabledMenu ?
        <motion.nav
          variants={menuVariant}
          initial="initial"
          animate="visible"
          exit="exit"
          className="sidebar"
        >
          <ul className="sidebar-menu">
            <li>
              <NavLink to="/" onClick={() => setDisabledMenu(true)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="about" onClick={() => setDisabledMenu(true)}>
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
              variants={menuVariant}
              exit="exit"
              className="genres-menu">
              {genreList && genreList.map((genre) => (
                <li key={genre?.id}>
                  <NavLink
                    onClick={() => {
                      findByGenres(genre?.name);
                      setDisabledMenu(true)
                      setEnabled(false)
                    }}
                    to={`/genres/${genre?.name.toLowerCase()}`}
                  >
                    {genre?.name}
                  </NavLink>
                </li>
              ))}
            </motion.ul>
          ) : null}
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
          <Upcoming upcomingMovies={upcomingMovies} getMovie={getMovie} setDisabledMenu={setDisabledMenu} />
        </motion.nav> : null
      }
    </AnimatePresence>

  )
}

export default Header
