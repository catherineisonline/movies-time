import React, { useEffect, useRef } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import DarkWhite from '../assets/images/dark-theme-white.png'
import LightWhite from '../assets/images/light-theme-white.png'
import HamLight from '../assets/images/ham-light.png'
import NoImage from '../assets/images/no-image-two.png'
import CloseLight from '../assets/images/close-light.png'

const HeaderTwo = ({
  query,
  setQuery,
  searchResults,
  toggleMenu,
  disabledMenu,
  getMovie,
  setSearchResults,
  getCastDetails,
  theme,
  setThemeMode
}) => {
  const ref = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setQuery('');
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [setQuery]);

  return (
    <nav className={`navigation-two `}>
      {disabledMenu ? (
        <img alt='open menu button' className="ham" src={HamLight} onClick={toggleMenu} />
      ) : (
        <img alt='close menu button' className="ham opened" src={CloseLight} onClick={toggleMenu} />
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

            {searchResults.length > 0 ? <button className="search-btn" onClick={() => setQuery("")}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50"
                fill="#e4e4e4"
              >
                <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
              </svg>
            </button> :
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
            }
          </section>

          {searchResults && searchResults.length > 0 ? (
            <ul className="search-results" ref={ref}>
              {searchResults.map((result, index) => (
                <li key={index}>
                  <Link onClick={() => {
                    if (result.media_type === 'movie') { getMovie(result.id); } if (result.media_type === 'person') {
                      getCastDetails(result.id)
                    } setSearchResults([]); setQuery('')
                  }}
                    to={result.media_type === 'movie' ? `/movies/${result.title?.toLowerCase().replace(/ /g, '-')}` : `/actors/${result.name?.toLowerCase().replace(/ /g, '-')}`}
                  >
                    {result.poster_path ? (
                      <img
                        alt={`${result.title}`}
                        src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
                      />
                    ) : result.backdrop_path ? (
                      <img
                        alt={`${result.title}`}
                        src={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`}
                      />
                    ) : (
                      <img
                        alt={`${result.title}`}
                        src={NoImage}
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
          <button onClick={() => { if (theme === 'light') { setThemeMode() } }} className={theme === 'light' ? 'dark-mode-off' : 'dark-mode-on'}>
            <img src={DarkWhite} alt='toggle dark mode' />
            <span>dark</span>
          </button>
          <button onClick={() => { if (theme === 'dark') { setThemeMode(); } }} className={theme === 'dark' ? 'light-mode-off' : 'light-mode-on'}>
            <img src={LightWhite} alt='toggle light mode' />
            <span>light</span>
          </button>
        </section>
      </section>
    </nav >
  )
}

export default HeaderTwo
