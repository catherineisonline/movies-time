import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import DarkWhite from '../assets/images/dark-theme-white.png'
import LightWhite from '../assets/images/light-theme-white.png'
import HamLight from '../assets/images/ham-light.png'

import CloseLight from '../assets/images/close-light.png'

const HeaderTwo = ({
  query,
  setQuery,
  searchResults,
  toggleMenu,
  disabled,
}) => {
  searchResults.map((result, index) => {
    console.log(result.first_air_date)
    console.log(typeof result.release_date)
  })

  return (
    <nav className="navigation-two">
      {disabled ? (
        <img className="ham" src={HamLight} onClick={toggleMenu} />
      ) : (
        <img className="ham" src={CloseLight} onClick={toggleMenu} />
      )}
      <h1>
        <Link to="/">
          Movies Time
        </Link>
      </h1>
      <section className='header-actions'>
      <section className="search">
      <section className='search-section'>
      <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="90"
            height="90"
            viewBox="0 0 30 30"
            fill="#e4e4e4"
          >
            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
          </svg>
        </button>
      </section>
       

        {searchResults && searchResults.length > 0 ? (
          <ul className="search-results">
            {searchResults.map((result, index) => (
              <li key={index}>
                <Link to="/">
                  {result.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
                    />
                  ) : result.backdrop_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`}
                    />
                  ) : (
                    <img
                      src={`https://image.tmdb.org/t/p/original/${result.profile_path}`}
                    />
                  )}
                  <section>
                    <h3>
                      {result.title ? `${result.title}` : `${result.name}`}
                    </h3>
                    <p>
                      {result.first_air_date && result.first_air_date.length > 0
                        ? result.first_air_date.slice(0, 4)
                        : result.release_date && result.release_date.length > 0
                        ? result.release_date.slice(0, 4)
                        : null}
                    </p>
                  </section>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
      <section className="theme-btns">
        <button>
          <img src={DarkWhite} />
          <span>dark</span>
        </button>
        <button>
          <img src={LightWhite} />
          <span>light</span>
        </button>
      </section>
</section>
    </nav>
  )
}

export default HeaderTwo
