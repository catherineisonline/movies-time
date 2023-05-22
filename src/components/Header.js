import React, { useEffect, useState } from 'react'
import {  NavLink } from 'react-router-dom'
import './header.css'
import Upcoming from './Upcoming'
import ChevronLight from '../assets/images/chevron-light.png'
import WebIcon from '../assets/images/website-icon-dark.png'
import GitLight from '../assets/images/github-dark.png'
import MovieLight from '../assets/images/movie-light.png'
import { motion } from "framer-motion"


const Header = ({
  genreList,
  setGenreId,
  setCurrentGenre,
  getMovie,
  disabled,
  setDisabled,
}) => {
  const [upcomingMovies, setUpcomingMovies] = useState([])

  const [enabled, setEnabled] = useState(false)
  const toggleGenres = () => {
    enabled ? setEnabled(false) : setEnabled(true)
  }
  const getUpcoming = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=b71bcab3d07039b32d23c21d747e9d40&language=en-US&page=1`,
    )
      .then((response) => response.json())
      .then((data) => {
        setUpcomingMovies([...data.results].slice(0, 6))
      })
  }
  useEffect(() => {
    getUpcoming()
  }, [])
  return (
    <>
      {!disabled ? (
        <motion.nav
        initial={{ opacity: 0, x: "-100%" }}
        animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "-100%"  }}
      transition={{ duration: 1}}
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
                    Genres <img src={ChevronLight} />
                  </button>
                ) : (
                  <button onClick={toggleGenres}>
                    Genres <img src={ChevronLight} />
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
        <a target="_blank" href="https://ekaterine-mitagvaria.vercel.app/">
          <img src={WebIcon} />
        </a>
        <a target="_blank"  href="https://github.com/catherineisonline/movies-time">
          <img src={GitLight} />
        </a>
        <a target="_blank"  href="https://developers.themoviedb.org/4/getting-started/authorization">
          <img src={MovieLight} />
        </a>
      </section>
          <Upcoming upcomingMovies={upcomingMovies} getMovie={getMovie} setDisabled={setDisabled}/>
        </motion.nav>
      ) : <motion.nav
        animate={{ opacity: 0, x: "-100%" }}
        initial={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "-100%"  }}
      transition={{ duration: 1}}
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
                    Genres <img src={ChevronLight} />
                  </button>
                ) : (
                  <button onClick={toggleGenres}>
                    Genres <img src={ChevronLight} />
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
        <a target="_blank" href="https://ekaterine-mitagvaria.vercel.app/">
          <img src={WebIcon} />
        </a>
        <a target="_blank"  href="https://github.com/catherineisonline/movies-time">
          <img src={GitLight} />
        </a>
        <a target="_blank"  href="https://developers.themoviedb.org/4/getting-started/authorization">
          <img src={MovieLight} />
        </a>
      </section>
   
          <Upcoming upcomingMovies={upcomingMovies} getMovie={getMovie} setDisabled={setDisabled}/>
        </motion.nav>}
    </>
  )
}

export default Header
