import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import ItemDetails from "./Components/ItemDatails/ItemDetails";
import Login from "./Components/Login/Login";
import Movies from "./Components/Movies/Movies";
import Network from "./Components/Network/Network";
import Notfound from "./Components/Notfound/Notfound";
import People from "./Components/People/People";
import PersonDetails from "./Components/PersonDetails/PersonDetails.jsx";
import Register from "./Components/Register/Register";
import TvDetails from "./Components/TvDetails/TvDetails.jsx";
import store from "./readux/store";
import Root from "./Root";

function App() {
  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      getusertoken();
    }
  }, []);

  function Protection(props) {
    if (localStorage.getItem("user") === null) {
      return <Navigate to="/" />;
    } else {
      return props.children;
    }
  }
  const [userdata, setUserdata] = useState(null);

  let Router = createHashRouter([
    {
      path: "/",
      element: <Root userdata={userdata} logOut={logOut} />,
      children: [
        {
          path: "home",
          element: (
            <Protection>
              {" "}
              <Home />{" "}
            </Protection>
          ),
        },
        { path: "register", element: <Register /> },
        { index: true, element: <Login getusertoken={getusertoken} /> },
        {
          path: "people",
          element: (
            <Protection>
              {" "}
              <People />{" "}
            </Protection>
          ),
        },
        {
          path: "network",
          element: (
            <Protection>
              {" "}
              <Network />{" "}
            </Protection>
          ),
        },
        {
          path: "home",
          element: (
            <Protection>
              {" "}
              <Home />{" "}
            </Protection>
          ),
        },
        {
          path: "datails/:id",
          element: (
            <Protection>
              {" "}
              <ItemDetails />{" "}
            </Protection>
          ),
        },
        {
          path: "persondetails/:id",
          element: (
            <Protection>
              {" "}
              <PersonDetails />{" "}
            </Protection>
          ),
        },
        {
          path: "tvdetails/:id",
          element: (
            <Protection>
              {" "}
              <TvDetails />{" "}
            </Protection>
          ),
        },
        { path: "*", element: <Notfound /> },

        {
          path: "movies",
          element: (
            <Protection>
              {" "}
              <Movies />{" "}
            </Protection>
          ),
        },
      ],
    },
  ]);

  function getusertoken() {
    let usercode = localStorage.getItem("user");
    var decoded = jwt_decode(usercode);

    setUserdata(decoded);
  }

  function logOut() {
    localStorage.removeItem("user");
    setUserdata(null);
  }

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={Router} />
      </Provider>
    </>
  );
}

export default App;
