import React from 'react'
import './about.css'
import { motion } from "framer-motion"
import { pageVariant } from '../homepage/Homepage'
const About = ({ theme }) => {
  return (
    <motion.main
      variants={pageVariant}
      initial="initial"
      animate="visible"
      exit="exit"
      className={`about ${theme}`}>
      <h2>About us</h2>
      <p>
        Welcome to Movies Time, founded in 2023 with the goal of providing
        comprehensive information about all types of movies. We understand the
        passion and dedication of movie lovers and strive to keep our audience
        informed and up-to-date with the latest developments in the film
        industry. Our website is designed to be user-friendly and easy to
        navigate, with a variety of tools to help users discover and learn about
        new movies. You can check ratings, read detailed information about
        movies, and search for movies by title, genre or even by the release
        date. Our website offers a wide range of genres, including action,
        adventure, comedy, drama, fantasy, horror, romance, and science fiction.</p>
      <p>We understand that movie lovers have different preferences, that's why
        we have dedicated sections for each genre, where you can find the latest
        releases, upcoming movies and even the classics. You can also find the
        top rated movies of all time, which are updated regularly to keep you
        informed about the best movies to watch. One of the things that sets our
        website apart is our commitment to providing the latest updates about
        the movie industry. We have a team of experts who are constantly working
        to bring you the latest news, rumors, trailers, and interviews with the
        industry's top talent. We also have a section dedicated to movie events
        and festivals, where you can find all the information about the upcoming
        events, the movies that will be featured and the schedules of the
        events. We know that our visitors are always looking for new and
        exciting content, that's why we have a section dedicated to movie
        reviews, where you can find reviews of the latest releases, as well as
        the classics, written by our team of experienced movie critics.   </p>
      <p>
        Our website is designed to be accessible and easy to use, and we are
        constantly working to improve and update the website to ensure that you
        have access to the most accurate and relevant information about the
        movies you love. Whether you are a casual movie-goer or a film
        enthusiast, our website is the perfect destination for all your
        movie-related needs. We are dedicated to providing the best experience
        for our visitors, and we look forward to serving you with the latest
        information about the movie industry. Thank you for visiting and we hope
        you enjoy exploring our website.
      </p>
    </motion.main>
  )
}

export default About
