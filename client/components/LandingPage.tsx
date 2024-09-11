import React from 'react'

const LandingPage: React.FC = () => {
  return (
    <div className="container">
      <h1 className="text-3xl font-bold">DonateMate</h1>
      <div className="image-grid">
        <div className="image-card">
          <img
            className="image"
            src="https://via.placeholder.com/150"
            alt="Placeholder 1"
          />
          <div className="name">Hospice Cuba Street</div>
        </div>
        <div className="image-card">
          <img
            className="image"
            src="https://via.placeholder.com/150"
            alt="Placeholder 2"
          />
          <div className="name">Salvation Army Miramar</div>
        </div>
        <div className="image-card">
          <img
            className="image"
            src="https://via.placeholder.com/150"
            alt="Placeholder 3"
          />
          <div className="name">Aro Valley Opshop</div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
