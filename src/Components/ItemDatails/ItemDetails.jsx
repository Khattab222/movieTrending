import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function ItemDetails() {
  let { id } = useParams();
  const imgpath = `https://image.tmdb.org/t/p/w500/`;
  const [movieDetails, setmovieDetails] = useState({});

  const [genres, setgenres] = useState([])

  useEffect(() => {
    getmovieDetails(id);
  }, []);

 
  async function getmovieDetails(id) {
    let { data } = await axios.get(
      ` https://api.themoviedb.org/3/movie/${id}?api_key=5a85e1a3818a5372ba0f9e7742424f0f&language=en-US`
    );

    console.log(data);
    setmovieDetails(data);
    setgenres(data.genres)
  }

  return (
    <>
      <div className="row my-5">
        <div className="col-sm-4">
          <img className="w-100" src={imgpath+movieDetails.poster_path} alt="" />
        </div>
        <div className="col-sm-8 ">
            <h2 className="text-center">{movieDetails.title}</h2>
            <h3 className="text-info">{movieDetails.tagline}</h3>
            <p>{movieDetails.overview}</p>
            {genres.map((e,index) => <span className="bg-info m-3 p-2 rounded">{e.name}</span>)}
        <p className="my-3" >vote average : {movieDetails.vote_average}</p>
        <p className="my-2" >vote average : {movieDetails.vote_count}</p>
        </div>
      </div>
    </>
  );
}
