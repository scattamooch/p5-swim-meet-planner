import React from 'react';
import "../styling/Carousel.css"

function CarouselItems({item, width}) {

    return (
        <div className = "carousel-item" style={{width: width}}>
            <div></div>
            <img className = "carousel-image" src={item.image} alt={item.title}/>
            <div className = "carousel-item-text">{item.description}</div>
        </div>
    )
}

export default CarouselItems;