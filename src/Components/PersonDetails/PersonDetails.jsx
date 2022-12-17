import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function ItemDetails() {
  let { id } = useParams();
  const imgpath = `https://image.tmdb.org/t/p/w500/`;
  const [personDetails, setpersonDetails] = useState({});

  const [genres, setgenres] = useState([])

  useEffect(() => {
    getpersonDetails(id)
  }, []);

 
  async function getpersonDetails(id) {
    let {data}= await axios.get(
      ` https://api.themoviedb.org/3/person/${id}?api_key=5a85e1a3818a5372ba0f9e7742424f0f&language=en-US`
    );

    console.log(data);
    setpersonDetails(data);

  }

  return (
    <>

  
      <div className="row my-5">
        <div className="col-sm-4">
          <img className="w-100" src={imgpath+personDetails.profile_path} alt="" />
        </div>
        <div className="col-sm-8 ">
            <h2 className="text-center">{personDetails.name}</h2>

         
            <p>{personDetails.biography}</p>
           
        <p className="my-3" >place of birth : {personDetails.place_of_birth}</p>
        <p className="my-3" >place of birth : {personDetails.birthday}</p>
        <p className="my-3" >popularity : {personDetails.popularity}</p>
        <p className="my-3" >Drpartment : {personDetails.known_for_department}</p>
        </div>
      </div>
    </>
  );
}
