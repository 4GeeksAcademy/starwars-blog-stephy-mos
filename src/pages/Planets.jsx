import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Planets = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    dispatch({ type: "fetch_planets" });
  }, [dispatch]);

  const addFavorite = (planet) => {
    const favorite = { ...planet, type: "planet" };
    if (!store.favorites.find(f => f.uid === planet.uid && f.type === "planet")) {
      dispatch({ type: "add_favorite", payload: favorite });
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Planets</h2>
      <div className="row">
        {store.planets && store.planets.length > 0 ? (
          store.planets.map((planet) => (
            <div key={planet.uid} className="col-md-3 mb-4">
              <div className="card">
                <img
                  src={`https://placehold.co/400x200/000000/FFFFFF.png?text=${encodeURIComponent(planet.name)}`}
                  className="card-img-top"
                  alt={planet.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{planet.name}</h5>
                  <button
                    className="btn btn-warning"
                    onClick={() => addFavorite(planet)}
                  >
                    Add to Favorites
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading planets...</p>
        )}
      </div>
    </div>
  );
};