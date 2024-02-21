import {
  Routes,
  Route,
  useLocation,

} from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react'
import './core-ui/index.css'
import './core-ui/light-mode.css'
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
import NotFound from './routes/not-found/NotFound';

const baseUrl = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const App = () => {
  const [theme, setTheme] = useState('dark');
  const [movieList, setMovieList] = useState([])
  const [genreList, setGenreList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageAmount, setPageAmount] = useState(0)
  const [genreListMovies, setGenreListMovies] = useState([])
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

  const [disabledMenu, setDisabledMenu] = useState(true);

  const toggleMenu = () => {
    disabledMenu ? setDisabledMenu(false) : setDisabledMenu(true);
  }

  const setThemeMode = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const fetchJSON = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response issue with url: ${url}`);
    }
    return response.json();
  }

  const findMovies = useCallback(async (currentPage) => {
    try {
      const url = `${baseUrl}/movie/top_rated?api_key=${apiKey}&language=en-US&page=${currentPage}`;
      const data = await fetchJSON(url);
      setPageAmount(499);
      setMovieList([...data.results]);
    } catch (err) {
      console.error('Error in findMovies:', err);
    }
  }, [])

  useEffect(() => {
    findMovies(currentPage);
  }, [findMovies, currentPage]);


  const findGenres = useCallback(async () => {
    try {
      const url = `${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`;
      const data = await fetchJSON(url);
      setGenreList([...data.genres]);
    } catch (err) {
      console.error('Error in findGenres:', err);
    }
  }, [])

  useEffect(() => {
    findGenres();
  }, [findGenres]);

  const findByGenres = useCallback(async (genreName) => {
    try {
      const url = `${baseUrl}/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genreName}&page=${currentPage}`;
      const data = await fetchJSON(url);
      setPageAmount(499);
      localStorage.setItem('genreId', JSON.stringify([...data.results]));
      setGenreListMovies([...data.results]);
    } catch (err) {
      console.error('Error in findByGenres:', err);
    }
  }, [currentPage]);


  useEffect(() => {
    if (localStorage.getItem('genreId') !== null) {
      const data = JSON.parse(localStorage.getItem('genreId'));
      setGenreListMovies(data);
    }
  }, []);
  const getTrending = useCallback(async () => {
    try {
      const url = `${baseUrl}/trending/movie/day?api_key=${apiKey}`;
      const data = await fetchJSON(url);
      setTrendingMovies([...data.results].slice(0, 6))
    } catch (err) {
      console.log("Erro in getTrening:", err)
    }
  }, []);

  useEffect(() => {
    getTrending();
  }, [getTrending])

  const getMovie = async (movieId) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    // single movie
    try {
      const url = `${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US`;
      const data = await fetchJSON(url);
      localStorage.setItem('currentMovie', JSON.stringify(data));
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
    }
    catch (err) {
      console.log('Error in getMovie:', err);
    }
    // movie similar movies
    try {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=b71bcab3d07039b32d23c21d747e9d40&language=en-US&page=1`;
      const data = await fetchJSON(url);
      setSimilarMovies([...data.results].slice(0, 5));
    }
    catch (err) {
      console.log('Error in similar movies:', err);
    }
    // movie videos
    try {
      const url = `${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`;
      const data = await fetchJSON(url);
      const splitVids = data.results.filter((key, index) => index <= 1);
      setVideos({
        ...videos,
        id: [...data.results],
        size: [...data.results].length,
      })
      setVideosPreview({
        ...videos,
        id: splitVids,
      })
    }
    catch (err) {
      console.log('Error in getMovie videos:', err);
    }
    // movie images
    try {
      const url = `${baseUrl}/movie/${movieId}/images?api_key=${apiKey}`;
      const data = await fetchJSON(url);
      const splitImgs = data.backdrops.filter((key, index) => index <= 1)
      setPictures({
        ...pictures,
        id: [...data.backdrops],
        size: [...data.backdrops].length,
      })
      setPicturesPreview({
        ...pictures,
        id: splitImgs,
      })
    }
    catch (err) {
      console.log('Error in getMovie images:', err);
    }
    // movie keywords
    try {
      const url = `${baseUrl}/movie/${movieId}/keywords?api_key=${apiKey}`;
      const data = await fetchJSON(url);
      setKeywords({ ...keywords, keyword: [...data.keywords] });
    }
    catch (err) {
      console.log('Error in getMovie keywords:', err);
    }
    // movie credits
    try {
      const url = `${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`;
      const data = await fetchJSON(url);
      setCast([...data.cast]);
      setCastPreview([...data.cast].slice(0, 5));
    }
    catch (err) {
      console.log('Error in getMovie credits:', err);
    }
  }

  useEffect(() => {
    const storedMovieData = localStorage.getItem('currentMovie');
    if (storedMovieData) {
      const data = JSON.parse(storedMovieData);
      getMovie(data.id);
    }
  }, []);

  const getCastDetails = async (personId) => {
    // person
    try {
      const url = `${baseUrl}/person/${personId}?api_key=${apiKey}&language=en-US`;
      const data = await fetchJSON(url);
      localStorage.setItem('castInfo', JSON.stringify(data));
      setCastDetails({
        ...data,
        name: data.name,
        biography: data.biography,
        birthday: data.birthday,
        known_for_department: data.known_for_department,
        place_of_birth: data.place_of_birth,
        profile_path: data.profile_path,
      })
    }
    catch (err) {
      console.log('Error in getCastDetails:', err);
    }
    // movie credits
    try {
      const url = `${baseUrl}/person/${personId}/movie_credits?api_key=${apiKey}&language=en-US`;
      const data = await fetchJSON(url);
      setActedIn([...data.cast].slice(0, 19))
    }
    catch (err) {
      console.log('Error in getCastDetails movie credicts:', err);
    }
  }

  useEffect(() => {
    const castInfo = localStorage.getItem('castInfo');
    if (castInfo) {
      const data = JSON.parse(castInfo);
      setCastDetails({
        ...data,
        name: data.name,
        biography: data.biography,
        birthday: data.birthday,
        known_for_department: data.known_for_department,
        place_of_birth: data.place_of_birth,
        profile_path: data.profile_path,
      })
    }
  }, []);

  const getSearch = useCallback((query) => {
    if (query === '') setSearchResults([])
    fetch(
      `${baseUrl}/search/multi?api_key=${apiKey}&language=en-US&query=${query}&page=1`,
    )
      .then((response) => response.json())
      .then((data) => {
        setSearchResults([...data.results].slice(0, 4));
      })
      .catch((err) => setSearchResults([]))
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    getSearch(query);
  }, [getSearch, query]);

  const location = useLocation();

  return (
    <>
      <Header
        genreList={genreList}
        getMovie={getMovie}
        disabledMenu={disabledMenu}
        setDisabledMenu={setDisabledMenu}
        theme={theme}
        findByGenres={findByGenres}

      />
      <HeaderTwo
        setQuery={setQuery}
        query={query}
        searchResults={searchResults}
        toggleMenu={toggleMenu}
        disabledMenu={disabledMenu}
        getMovie={getMovie}
        setSearchResults={setSearchResults}
        getCastDetails={getCastDetails}
        theme={theme}
        setThemeMode={setThemeMode}
      />
      <Routes location={location} key={location.key}>
        <Route
          path="/"
          element={
            <Homepage
              theme={theme}
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
              getMovie={getMovie}
              theme={theme}
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
          exact path={`/movies/:id`}
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
              theme={theme}
            />
          }
        />
        <Route path={`/cast/:id`} element={<Cast cast={cast} getCastDetails={getCastDetails} theme={theme} />} />
        <Route
          path={`/actors/:id`}
          element={<SingleCast cast={cast} singleMovie={singleMovie} castDetails={castDetails} actedIn={actedIn} getMovie={getMovie} theme={theme} />}
        />
        <Route
          path={`/movies/:id/videos`}
          element={<Videos videos={videos} theme={theme} />}
        />
        <Route
          path={`/movies/:id/pictures`}
          element={<Pictures pictures={pictures} theme={theme} />}
        />
        <Route path="/about" element={<About theme={theme} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
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
