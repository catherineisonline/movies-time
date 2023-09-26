import React from 'react'
import './videos.css'
import { useEffect } from 'react'
import { motion } from "framer-motion";
import { pageVariant } from '../homepage/Homepage';
const Videos = ({ videos }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])
  return (
    <motion.main
      variants={pageVariant}
      initial="initial"
      animate="visible"
      exit="exit"
      className="videos-route" >
      <h2>Videos</h2>
      <section className="videos-grid">
        {videos.id.map((id) => (
          <div key={id.name} className="video">
            <h4>{id.name}</h4>
            <iframe
              className="video-frame"
              src={`https://www.youtube.com/embed/${id.key}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={id.name}
            />
          </div>
        ))}
      </section>
    </motion.main>
  )
}

export default Videos
