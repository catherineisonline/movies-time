import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './header.css'
import Upcoming from './Upcoming'

const Header = ({ genreList, setGenreId, setCurrentGenre }) => {
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const getUpcoming = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=b71bcab3d07039b32d23c21d747e9d40&language=en-US&page=1`,
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log([...data.results])
        setUpcomingMovies([...data.results].slice(0, 6))
      })
  }
  useEffect(() => {
    getUpcoming()
  }, [])
  return (
    <header>
      <h1>
        <Link to="/">Movies Time</Link>
      </h1>
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
      <Upcoming upcomingMovies={upcomingMovies} />
    </header>
  )
}

export default Header
