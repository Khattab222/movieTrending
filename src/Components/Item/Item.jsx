import React from "react";
import { Link } from "react-router-dom";

export default function ({ data }) {
  const imgpath = `https://image.tmdb.org/t/p/w500/`;

  return (
    <>
      <div className="col-md-2 rounded p-1">
        <div className="movieitempadding m-1 rounded bg-info position-relative">
          <img
            className="w-100 rounded "
            src={imgpath + data.poster_path}
            alt=""
          />
          <Link to={`/datails/${data.id}`}>
            <div className="details position-absolute top-0 start-0 bottom-0 end-0  rounded text-white text-center ">
              <div className=" ">

                {data.overview?<h6>{data.overview.split(" ").slice(0, 12).join(" ")}....</h6> :null}
                
              </div>
            </div>
          </Link>
          {data.vote_average? <div className="rating position-absolute top-0 end-0">
           
           {data.vote_average.toFixed(1)}
         </div> :null}
         
        </div>
      </div>
    </>
  );
}
