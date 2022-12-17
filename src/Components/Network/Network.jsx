
import React from "react";
import { useEffect } from "react";
import Item from "../Item/Item";

import { useDispatch, useSelector } from "react-redux";
import { getTrending } from "../../readux/moviesREducer";
import { Link } from "react-router-dom";

export default function Network() {
  const imgpath = `https://image.tmdb.org/t/p/w500/`;


  let { trendingMovies } = useSelector((state) => state.movie);

  let dispatch = useDispatch();

  useEffect(() => {

    dispatch(getTrending("tv"));
  }, []);

  return (
    <>
      <div className="row gy-3 gx-5 align-items-center my-5">

      {trendingMovies.map((item, index) => (
              <div key={index} className="col-md-2 rounded p-1">
                <div className="movieitempadding m-1 rounded bg-info position-relative">
                  <img
                    className="w-100 rounded "
                    src={imgpath + item.poster_path}
                    alt=""
                  />
                  <Link to={`/tvdetails/${item.id}`}>
                    <div className="details position-absolute top-0 start-0 bottom-0 end-0  rounded text-white text-center ">
                      <div className="">
                        <h6>{item.name}</h6>
                      </div>
                    </div>
                  </Link>
                  <div className="rating position-absolute top-0 end-0">
                    {item.popularity.toFixed(1)}
                  </div>
                </div>
              </div>
            ))}
   
      </div>
    </>
  );
}
