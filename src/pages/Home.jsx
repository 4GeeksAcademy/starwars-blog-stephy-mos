import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";
import { storeAsyncDispatch } from "../store.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    storeAsyncDispatch(dispatch, { type: "fetch_people", limit: 5 });
    storeAsyncDispatch(dispatch, { type: "fetch_planets", limit: 5 });
    storeAsyncDispatch(dispatch, { type: "fetch_vehicles", limit: 5 });
  }, [dispatch]);
  
  const toggleFavorite = (item, type) => {
    const exists = store.favorites.find(f => f.uid === item.uid && f.type === type);
    if (exists) {
      dispatch({ type: "remove_favorite", payload: { ...item, type } });
    } else {
      dispatch({ type: "add_favorite", payload: { ...item, type } });
    }
  };

  const renderCard = (item, type) => {
    const isFavorite = store.favorites.some(f => f.uid === item.uid && f.type === type);
    const properties = Object.entries(item.properties).slice(0, 3);

  return (
      <div key={item.uid} className="card me-3" style={{ width: "18rem", flexShrink: 0 }}>
        <img
          src={`https://placehold.co/300x150/000000/FFFFFF.png?text=${encodeURIComponent(item.name)}`}
          className="card-img-top"
          alt={item.name}
        />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <ul className="list-unstyled">
            {properties.map(([key, value]) => (
              <li key={key}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <Link to={`/single/${item.type}/${item.uid}`} className="btn btn-primary">
              Learn More
            </Link>
            <button className="btn btn-link text-danger" onClick={() => toggleFavorite(item)}>
              <FontAwesomeIcon icon={isFavorite ? solidHeart : regularHeart} />
            </button>
          </div>
        </div>
      </div>
      );
    };

  return (
    <div className="container mt-4">

      <h2 className="mb-3">Characters</h2>
      <div className="d-flex overflow-auto pb-3">
        {store.people.length > 0
          ? store.people.map(person => renderCard(person, "people"))
          : <p>Loading characters...</p>
        }
      </div>

      
      <h2 className="mt-5 mb-3">Planets</h2>
      <div className="d-flex overflow-auto pb-3">
        {store.planets.length > 0
          ? store.planets.map(planet => renderCard(planet, "planets"))
          : <p>Loading planets...</p>
        }
      </div>

      
      <h2 className="mt-5 mb-3">Vehicles</h2>
      <div className="d-flex overflow-auto pb-3">
        {store.vehicles.length > 0
          ? store.vehicles.map(vehicle => renderCard(vehicle, "vehicles"))
          : <p>Loading vehicles...</p>
        }
      </div>
    </div>
  );
};