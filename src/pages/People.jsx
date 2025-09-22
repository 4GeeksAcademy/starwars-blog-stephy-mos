import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const People = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    dispatch({ type: "fetch_people" });
  }, [dispatch]);

  const addFavorite = (person) => {
    const favorite = { ...person, type: "people" };
    if (!store.favorites.find(f => f.uid === person.uid && f.type === "people")) {
      dispatch({ type: "add_favorite", payload: favorite });
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">People</h2>
      <div className="row">
        {store.people && store.people.length > 0 ? (
          store.people.map((person) => (
            <div key={person.uid} className="col-md-3 mb-4">
              <div className="card">
                <img
                src={`https://placehold.co/400x200/000000/FFFFFF.png?text=${person.name}`}
                className="card-img-top"
                alt={person.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{person.name}</h5>
                  <button
                    className="btn btn-warning"
                    onClick={() => addFavorite(person)}
                  >
                    Add to Favorites
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading people...</p>
        )}
      </div>
    </div>
  );
};