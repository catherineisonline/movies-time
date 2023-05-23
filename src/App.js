import {
  Routes,
  Route,
  BrowserRouter,

} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import './core-ui/index.css'
import Homepage from './routes/homepage/Homepage.js'
import About from './routes/about/About.js'
import Header from './components/Header.js'
import AllMovies from './routes/homepage/AllMovies.js'
import SingleMovie from './routes/single-movie/SingleMovie.js'
import Genres from './routes/genres/Genres.js'
import ReactPaginate from 'react-paginate'
import Hero from './routes/homepage/Hero.js'
import Videos from './routes/videos/Videos.js'
import Pictures from './routes/pictures/Pictures.js'
import HeaderTwo from './components/HeaderTwo.js'
import Cast from './routes/cast/Cast.js'
import SingleCast from './routes/single-cast/SingleCast.js'

const App = () => {
  // const [apiData, setApiData] = useState();
  const [movieList, setMovieList] = useState([])
  const [genreList, setGenreList] = useState([])
  const [currentGenre, setCurrentGenre] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageAmount, setPageAmount] = useState(0)
  const [genreListMovies, setGenreListMovies] = useState([])
  const [genreId, setGenreId] = useState(0)
  const [trendingMovies, setTrendingMovies] = useState([])
  const [similarMovies, setSimilarMovies] = useState([])
  const [videos, setVideos] = useState({ id: [], size: 0 })
  const [videosPreview, setVideosPreview] = useState({ id: [] })
  const [pictures, setPictures] = useState({ id: [], size: 0 })
  const [picturesPreview, setPicturesPreview] = useState({ id: [] })
  const [cast, setCast] = useState([])
  const [castDetails, setCastDetails] = useState({
    name: '',
    biography: '',
    birthday: '',
    known_for_department: '',
    place_of_birth: '',
    profile_path: '',
  })
  const [actedIn, setActedIn] = useState([])
  const [castPreview, setCastPreview] = useState([])
  const [keywords, setKeywords] = useState({ keyword: [] })
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [singleMovie, setSingleMovie] = useState({
    title: '',
    cover: '',
    budget: '',
    overview: '',
    tagline: '',
    release: '',
    imdb_id: '',
    votes: '',
    voteavg: '',
    genres: [],
    countries: [],
  })

  const [disabled, setDisabled] = useState(true)

  const toggleMenu = () => {
    disabled ? setDisabled(false) : setDisabled(true)
  }

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
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=b71bcab3d07039b32d23c21d747e9d40&language=en-US`,
    )
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('apiData', JSON.stringify(data));
        // setApiData(data);
        setSingleMovie({
          ...data,
          title: data.title,
          cover: data.poster_path,
          budget: data.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
          revenue: data.revenue
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
          overview: data.overview,
          tagline: data.tagline,
          release_year: data.release_date.slice(0, 4),
          release: data.release_date,
          imdb_id: data.imdb_id,
          votes: data.vote_count,
          voteavg: data.vote_average.toFixed(1),
          genres: [...data.genres],
          countries: [...data.production_countries],
          duration: data.runtime,
          original_lang: data.original_language.toUpperCase(),
          status: data.status,
          backdrop_path: data.backdrop_path,
        })
      })

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=b71bcab3d07039b32d23c21d747e9d40&language=en-US`,
    )
      .then((response) => response.json())
      .then((data) => {
        const splitVids = data.results.filter((key, index) => index <= 1)
        setVideos({
          ...videos,
          id: [...data.results],
          size: [...data.results].length,
        })
        setVideosPreview({
          ...videos,
          id: splitVids,
        })
      })

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=b71bcab3d07039b32d23c21d747e9d40`,
    )
      .then((response) => response.json())
      .then((data) => {
        const splitVids = data.backdrops.filter((key, index) => index <= 1)
        setPictures({
          ...pictures,
          id: [...data.backdrops],
          size: [...data.backdrops].length,
        })
        setPicturesPreview({
          ...pictures,
          id: splitVids,
        })
      })

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/keywords?api_key=b71bcab3d07039b32d23c21d747e9d40`,
    )
      .then((response) => response.json())
      .then((data) => {
        setKeywords({ ...keywords, keyword: [...data.keywords] })
      })
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=b71bcab3d07039b32d23c21d747e9d40&language=en-US&page=1`,
    )
      .then((response) => response.json())
      .then((data) => {
        setSimilarMovies([...data.results].slice(0, 5))
      })

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=b71bcab3d07039b32d23c21d747e9d40&language=en-US`,
    )
      .then((response) => response.json())
      .then((data) => {
        setCast([...data.cast])
        setCastPreview([...data.cast].slice(0, 5))
      })
  }


  // Saving movie in local to keep API call persistent
  useEffect(() => {
    if (window.localStorage !== undefined) {
      //getting data from the stoarge, transofrming back to json and calling getMovie api again
      const data = { ...JSON.parse(window.localStorage.getItem('apiData')) };
      getMovie(data.id);
    }
  }, []);




  const getCastDetails = (personId) => {
    fetch(
      `https://api.themoviedb.org/3/person/${personId}?api_key=b71bcab3d07039b32d23c21d747e9d40&language=en-US`,
    )
      .then((response) => response.json())
      .then((data) => {
        setCastDetails({
          ...data,
          name: data.name,
          biography: data.biography,
          birthday: data.birthday,
          known_for_department: data.known_for_department,
          place_of_birth: data.place_of_birth,
          profile_path: data.profile_path,
        })
      })
      .catch((err) => setSearchResults([]))


    fetch(
      `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=b71bcab3d07039b32d23c21d747e9d40&language=en-US`,
    )
      .then((response) => response.json())
      .then((data) => {
        setActedIn([...data.cast].slice(0, 19))
      })
      .catch((err) => setSearchResults([]))
  }

  const getSearch = (query) => {
    if (query === '') setSearchResults([])
    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=b71bcab3d07039b32d23c21d747e9d40&language=en-US&query=${query}&page=1`,
    )
      .then((response) => response.json())
      .then((data) => {
        setSearchResults([...data.results].slice(0, 4));
      })
      .catch((err) => setSearchResults([]))
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    findMovies(currentPage)
    findGenres()
    findByGenres(genreId)
    getTrending()
    getSearch(query)

  }, [genreId, currentPage, query])
  return (
    <BrowserRouter>
      <Header
        genreList={genreList}
        setGenreId={setGenreId}
        setCurrentGenre={setCurrentGenre}
        getMovie={getMovie}
        disabled={disabled}
        setDisabled={setDisabled}
      />
      <HeaderTwo
        setQuery={setQuery}
        query={query}
        searchResults={searchResults}
        toggleMenu={toggleMenu}
        disabled={disabled}
        getMovie={getMovie}
        setSearchResults={setSearchResults}
        getCastDetails={getCastDetails}
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
                  getMovie={getMovie}
                  PaginatedItems={
                    <PaginatedItems
                      setCurrentPage={setCurrentPage}
                      pageAmount={pageAmount}
                    />
                  }
                />
              }
              hero={
                <Hero trendingMovies={trendingMovies} getMovie={getMovie} />
              }
            />
          }
        />
        <Route
          path={`/genres/:id`}
          element={
            <Genres
              genreListMovies={genreListMovies}
              currentGenre={currentGenre}
              getMovie={getMovie}
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
          element={
            <SingleMovie
              singleMovie={singleMovie}
              videosPreview={videosPreview}
              videos={videos}
              picturesPreview={picturesPreview}
              pictures={pictures}
              keywords={keywords}
              similarMovies={similarMovies}
              castPreview={castPreview}
              cast={cast}
              getMovie={getMovie}
              getCastDetails={getCastDetails}
            />
          }
        />
        <Route path={`/cast/:id`} element={<Cast cast={cast} getCastDetails={getCastDetails} />} />
        <Route
          path={`/actors/:id`}
          element={<SingleCast cast={cast} singleMovie={singleMovie} castDetails={castDetails} actedIn={actedIn} getMovie={getMovie} />}
        />
        <Route
          path={`/movies/:id/videos`}
          element={<Videos videos={videos} />}
        />
        <Route
          path={`/movies/:id/pictures`}
          element={<Pictures pictures={pictures} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

function PaginatedItems({ setCurrentPage, pageAmount }) {
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1)
  }

  return (
    <>
      <ReactPaginate
        className="movies-pagination"
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
