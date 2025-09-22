import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Vehicles = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    dispatch({ type: "fetch_vehicles" });
  }, [dispatch]);

  const addFavorite = (vehicle) => {
    const favorite = { ...vehicle, type: "vehicle" };
    if (!store.favorites.find(f => f.uid === vehicle.uid && f.type === "vehicle")) {
      dispatch({ type: "add_favorite", payload: favorite });
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Vehicles</h2>
      <div className="row">
        {store.vehicles && store.vehicles.length > 0 ? (
          store.vehicles.map((vehicle) => (
            <div key={vehicle.uid} className="col-md-3 mb-4">
              <div className="card">
                <img
                  src={`https://placehold.co/400x200/000000/FFFFFF.png?text=${encodeURIComponent(vehicle.name)}`}
                  className="card-img-top"
                  alt={vehicle.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{vehicle.name}</h5>
                  <button
                    className="btn btn-warning"
                    onClick={() => addFavorite(vehicle)}
                  >
                    Add to Favorites
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading vehicles...</p>
        )}
      </div>
    </div>
  );
};