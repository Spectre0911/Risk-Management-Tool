import React, { useState } from 'react';
import './index.css';

const images = [
  { src: 'image1.jpg', caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non magna at sem vulputate porta. Duis scelerisque orci tincidunt nisi lobortis lobortis. Sed ligula leo, fermentum quis egestas sodales, aliquam quis arcu. Nam feugiat tortor.' },
  { src: 'image2.jpg', caption: 'Image 2 caption' },
  { src: 'image3.jpg', caption: 'Image 3 caption' }
];

function Guide(props) {
  const [currentImage, setCurrentImage] = useState(0);

  function prevImage() {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  }

  function nextImage() {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  }

  return (
    <div className="guide" style={{ display: props.show ? 'block' : 'none' }}>
      <div className="guide-content">
        <span className="close" onClick={props.onClose}>&times;</span>
        <div className="image-container">
          <img src={images[currentImage].src} alt={`Image ${currentImage + 1}`} />
          <p className="image-caption">{images[currentImage].caption}</p>
        </div>
        <div className="navigation">
          <button className="prev" onClick={prevImage}>&#8249;</button>
          <button className="next" onClick={nextImage}>&#8250;</button>
        </div>
      </div>
    </div>
  );
}