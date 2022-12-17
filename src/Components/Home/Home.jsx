import axios from "axios";

import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import style from "./Home.module.css";

export default function Home() {
  const [moviesarr, setmoviesarr] = useState([]);
  const [personsarr, setpersonsarr] = useState([]);
  const [tvsarr, settvsarr] = useState([]);
  const [loading, setloading] = useState(false);

  const imgpath = `https://image.tmdb.org/t/p/w500/`;

  async function getmoviesapi(type, callback) {
    setloading(true);
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${type}/day?api_key=5a85e1a3818a5372ba0f9e7742424f0f`
    );

    if (data.results) {
      setloading(false);
      callback(data.results.slice(0, 10));
    } else {
      setloading(true);
    }
  }

  useEffect(() => {
    getmoviesapi("movie", setmoviesarr);
    getmoviesapi("person", setpersonsarr);
    getmoviesapi("tv", settvsarr);
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading d-flex justify-content-center align-items-center ">
          <div className="sk-chase ">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
          </div>
        </div>
      ) : (
        <div>
          {/* movie trend */}
          <div className="row gy-3 gx-5 align-items-center my-5">
            <div className="col-md-4">
              <div className={style.brdtop}></div>
              <h2>
                Trending <br />
                Movies <br />
                to watch now
              </h2>
              <p className="text-muted"> Lorem ipsum dolor sit.</p>
              <div className={style.brdbottom}></div>
            </div>
            {moviesarr.map((item, index) => (
              <div key={index} className="col-md-2 rounded p-1">
                <div className="movieitempadding m-1 rounded bg-info position-relative">
                  <img
                    className="w-100 rounded "
                    src={imgpath + item.poster_path}
                    alt=""
                  />
                  <Link to={`/datails/${item.id}`}>
                    <div className="details position-absolute top-0 start-0 bottom-0 end-0  rounded text-white text-center ">
                      <div className=" ">
                        <h6>
                          {item.overview.split(" ").slice(0, 12).join(" ")}....
                        </h6>
                      </div>
                    </div>
                  </Link>
                  <div className="rating position-absolute top-0 end-0">
                    {item.vote_average.toFixed(1)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* person trend */}
          <div className="row gy-3 gx-5 align-items-center my-5">
            <div className="col-md-4">
              <div className={style.brdtop}></div>
              <h2>
                Trending <br />
                Person <br />
                to watch now
              </h2>
              <p className="text-muted"> Lorem ipsum dolor sit.</p>
              <div className={style.brdbottom}></div>
            </div>
            {personsarr.map((item, index) => (
              <div key={index} className="col-md-2 rounded p-1">
                <div className="movieitempadding m-1 rounded bg-info position-relative">
                  <img
                    className="w-100 rounded "
                    src={imgpath + item.profile_path}
                    alt=""
                  />
                  <Link to={`/persondetails/${item.id}`}>
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

          {/* tv trending */}
          <div className="row gy-3 gx-5 align-items-center my-5">
            <div className="col-md-4">
              <div className={style.brdtop}></div>
              <h2>
                Trending <br />
                TV <br />
                to watch now
              </h2>
              <p className="text-muted"> Lorem ipsum dolor sit.</p>
              <div className={style.brdbottom}></div>
            </div>
            {tvsarr.map((item, index) => (
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
        </div>
      )}
    </>
  );
}
