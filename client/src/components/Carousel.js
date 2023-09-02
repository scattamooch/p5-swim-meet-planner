import React from "react";
import CarouselItems from "./CarouselItems";
import {useState, useEffect} from "react";
import "../styling/Carousel.css"

function Carousel() {

    const [activeItem, setActiveItem] = useState(0);

    const items = [
        {
          title: "",
          description: "Log in or register to utilize the full functionality of the app!",
          image: "https://swimswam.com/wp-content/uploads/2014/06/Santa-Clara-Grand-Prix-by-Mike-Lewis.jpg"
        },
        {
          title: "",
          description: "Registering allows you to assign yourself a 'home team'",
          image: "https://vmrw8k5h.tinifycdn.com/news/wp-content/uploads/2016/05/Fort-Lauderdale-Pools-1.png"
        },
        {
          title: "",
          description: "Add swimmers, remove swimmers, edit their times... all in one place",
          image: "https://swimswam.com/wp-content/uploads/2013/04/Greensboro-Aquatic-Center-614x520.png"
        },
        {
          title: "",
          description: "Add an entirely new team to mock against if you need to",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQziZogOTod1xXJt8hFL4xWkc2ZsBcbh7yW4g&usqp=CAU"
        },
        {
          title: "",
          description: "Fire up the roster planner and mock for the best meet sheet possible",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVJ0IxqjEXE0xPPOi6miei8vSfSQnn9lUK6g&usqp=CAU"
        },
      ];

// gives functionality to the indicators and arrows. onClicks in each container below
    function updateIndex(newIndex) {
        if (newIndex < 0){
            newIndex = 0    
        }else if (newIndex >= items.length) {
            newIndex = items.length - 1;
        }
        setActiveItem(newIndex);
    };

    function moveIndex() {
        const nextIndex = activeItem + 1;
        if (nextIndex >= items.length) {
            updateIndex(0);
        }else {
        updateIndex(nextIndex);
        }
    }

    useEffect(() => {
        const timer = setTimeout(moveIndex, 4500)
        return () => {
            clearTimeout(timer);
        };
    }, [activeItem])

    return (
        <div className = "carousel-container">
            <div className = "inner-container"
            style = {{transform: `translate(-${activeItem * 100}%)`}}
            >
                {items.map((item) => {
                    return <CarouselItems item={item} width={"100%"}/>
                })}
            </div>
                <div className="carousel-buttons">
                    <button onClick = {() => {
                        updateIndex(activeItem - 1)
                    }}
                    className="arrow-buttons">
                        <span class="material-symbols-outlined">
                            arrow_back_ios
                        </span>
                    </button>
                    <div className="indicators">
                        {items.map((item, index) => {
                            return (
                            <button onClick = {() => {
                                updateIndex(index)
                            }}
                            className="indicator-buttons">
                                <span className={`material-symbols-outlined ${index === activeItem ? "indicator-symbol-active" : "indicator-symbol"}`}>
                                    radio_button_checked
                                </span>
                            </button>
                            )
                        })}
                        
                    </div>
                    <button onClick = {() => {
                        updateIndex(activeItem + 1)
                    }}
                    className="arrow-buttons">
                        <span class="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </button>
                </div>
        </div>
    )
}

export default Carousel;