import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Homepage from './routes/homepage/Homepage.js'
import About from './routes/about.js'
import Header from './components/Header.js'
import AllMovies from './routes/homepage/AllMovies.js'
import './core-ui/index.css'
import SingleMovie from './routes/single-movie/SingleMovie.js'
import Genres from './routes/genres/Genres.js'
import ReactPaginate from 'react-paginate'
import Hero from './routes/homepage/Hero.js'

const App = () => {
  const [movieList, setMovieList] = useState([])
  const [genreList, setGenreList] = useState([])
  const [currentGenre, setCurrentGenre] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageAmount, setPageAmount] = useState(0)
  const [genreListMovies, setGenreListMovies] = useState([])
  const [genreId, setGenreId] = useState(0)
  const [trendingMovies, setTrendingMovies] = useState([])
  const [singleMovie, setSingleMovie] = useState({
    title: '',
    cover: '',
    budget: '',
    overview: '',
    tagline: '',
    release: '',
    release: '',
    imdb_id: '',
    votes: '',
    voteavg: '',
    genres: [],
    countries: [],
  })

  const findMovies = (currentPage) => {
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=b71bcab3d07039b32d23c21d747e9d40&language=en-US&page=${currentPage}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setPageAmount(499)
        setMovieList([...data.results])
      })
  }
  const findGenres = () => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=b71bcab3d07039b32d23c21d747e9d40&language=en-US`,
    )
      .then((response) => response.json())
      .then((data) => {
        setGenreList([...data.genres])
      })
  }

  const findByGenres = (genreId) => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie/?api_key=b71bcab3d07039b32d23c21d747e9d40&language=en-US&with_genres=${genreId}&page=${currentPage}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setPageAmount(499)
        setGenreListMovies([...data.results])
      })
  }

  const getTrending = () => {
    fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=b71bcab3d07039b32d23c21d747e9d40`,
    )
      .then((response) => response.json())
      .then((data) => {
        setTrendingMovies([...data.results].slice(0, 6))
      })
  }

  const getMovie = (movieId) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=b71bcab3d07039b32d23c21d747e9d40&language=en-US`,
    )
      .then((response) => response.json())
      .then((data) => {
        setSingleMovie({
          ...singleMovie,
          title: data.title,
          cover: data.poster_path,
          budget: data.budget,
          revenue: data.revenue,
          overview: data.overview,
          tagline: data.tagline,
          release_year: data.release_date.slice(0, 4),
          release: data.release_date,
          imdb_id: data.imdb_id,
          votes: data.vote_count,
          voteavg: data.vote_average,
          genres: [...data.genres],
          countries: [...data.production_countries],
          duration: data.runtime,
          original_lang: data.original_language.toUpperCase(),
        })
        console.log(data)
      })
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    findMovies(currentPage)
    findGenres()
    findByGenres(genreId)
    getTrending()
  }, [genreId, currentPage])
  return (
    <Router>
      <Header
        genreList={genreList}
        setGenreId={setGenreId}
        setCurrentGenre={setCurrentGenre}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              allMovies={
                <AllMovies
                  movieList={movieList}
                  findByGenres={findByGenres}
                  // setMovieId={setMovieId}
                  getMovie={getMovie}
                  PaginatedItems={
                    <PaginatedItems
                      setCurrentPage={setCurrentPage}
                      pageAmount={pageAmount}
                    />
                  }
                />
              }
              hero={<Hero trendingMovies={trendingMovies} />}
            />
          }
        />
        <Route
          path={`/genres/:id`}
          element={
            <Genres
              genreListMovies={genreListMovies}
              currentGenre={currentGenre}
              PaginatedItems={
                <PaginatedItems
                  setCurrentPage={setCurrentPage}
                  pageAmount={pageAmount}
                />
              }
            />
          }
        />
        <Route
          path={`/movies/:id`}
          element={<SingleMovie singleMovie={singleMovie} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

function PaginatedItems({ setCurrentPage, pageAmount }) {
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1)
  }

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={(e) => {
          handlePageClick(e)
        }}
        pageRangeDisplayed={5}
        pageCount={pageAmount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  )
}
export default App
