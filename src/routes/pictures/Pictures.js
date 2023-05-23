import React from 'react'
import './pictures.css'
import { useEffect } from 'react'

const Pictures = ({ pictures }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])
  return (
    <main className="pictures-route" >
      <h2>Pictures</h2>
      <section className="pictures-grid">
        {pictures.id.map((img, index) => (
          <img
            alt=''
            aria-hidden="true"
            key={index}
            className="pictures-preview"
            src={`https://image.tmdb.org/t/p/original/${img.file_path}`}
          />
        ))}
      </section>{' '}
    </main>
  )
}

export default Pictures
