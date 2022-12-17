import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function ItemDetails() {
  let { id } = useParams();
  const imgpath = `https://image.tmdb.org/t/p/w500/`;
  const [TvDetails, setTvDetails] = useState({});

  const [genres, setgenres] = useState([])

  useEffect(() => {
    getTvDetails(id)
  }, []);
 
 
  async function getTvDetails(id) {
    let {data}= await axios.get(
      `  https://api.themoviedb.org/3/tv/${id}?api_key=5a85e1a3818a5372ba0f9e7742424f0f&language=en-US`
    );

    console.log(data);
    setTvDetails(data);
    setgenres(data.genres)
  }

  return (
    <>


      <div className="row my-5">
        <div className="col-sm-4">
          <img className="w-100" src={imgpath+TvDetails.poster_path} alt="" />
        </div>
        <div className="col-sm-8 ">
            <h2 className="text-center">{TvDetails.name}</h2>
            <p>{TvDetails.overview}</p>
         
           {genres.map((e,index) => <span key={index} className='bg-info m-4'>{e.name} </span>)}
           
        <p className="my-3" >vote average : {TvDetails.vote_average}</p>
        <p className="my-3" >Language : {TvDetails.original_language}</p>
        <p className="my-3" >popularity : {TvDetails.popularity}</p>
       
        </div>
      </div>
    </>
  );
}
