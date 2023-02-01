import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './header.css'
import Upcoming from './Upcoming'

const Header = ({
  genreList,
  setGenreId,
  setCurrentGenre,
  getMovie,
  disabled,
}) => {
  const [upcomingMovies, setUpcomingMovies] = useState([])
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
        <header className="sidebar">
          <nav>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="about">About</NavLink>
              </li>
              {genreList.map((genre) => (
                <li key={genre.id}>
                  <NavLink
                    onClick={() => {
                      setGenreId(genre.id)
                      setCurrentGenre(genre.name)
                    }}
                    to={`/genres/${genre.name.toLowerCase()}`}
                  >
                    {genre.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <Upcoming upcomingMovies={upcomingMovies} getMovie={getMovie} />
        </header>
      ) : null}
    </>
  )
}

export default Header
