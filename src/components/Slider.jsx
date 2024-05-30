import React from 'react'
import CardSlider from './CardSlider'

export default 
React.memo(function Slider({movies}) {
 
    const getMoviesFromRange=(from,to)=>{
        return movies.slice(from,to)
    }
  return (
    <div>             
        {/* 10 movies for 1 card only  */}
        <CardSlider title="Trending-now" data={getMoviesFromRange(0,10)}/>
        <CardSlider title="New Releases" data={getMoviesFromRange(10,20)}/>

        <CardSlider title="BlockBuster Movies" data={getMoviesFromRange(20,30)}/>

        <CardSlider title="Fantasy" data={getMoviesFromRange(30,40)}/>
        <CardSlider title="Action" data={getMoviesFromRange(40,50)}/>
        <CardSlider title="Popular movies" data={getMoviesFromRange(50,60)}/>


    </div>
  )
}

)