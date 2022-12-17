import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTrending } from '../../readux/moviesREducer';
import Item from '../Item/Item';



export default function Movies() {



let {trendingMovies} = useSelector((state) =>state.movie )

 let dispatch = useDispatch()


  useEffect(() => {
  
    dispatch(getTrending('movie'))
 
   
  }, [])
  
  return (
    <>
      <div className="row gy-3 gx-5 align-items-center my-5">
      {trendingMovies.map((mov,index) => <Item key={index} data={mov}/>)}
      </div>
    </>
  )
}
