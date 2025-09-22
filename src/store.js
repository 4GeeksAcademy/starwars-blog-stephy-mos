import { v4 as uuidv4 } from "uuid";

export const initialStore = () => ({
  people: [],
  planets: [],
  vehicles: [],
  favorites: [],
  message: null
});

export function storeReducer(store, action) {
  switch (action.type) {
    case "set_people":
      return { ...store, people: action.payload };
    case "set_planets":
      return { ...store, planets: action.payload };
    case "set_vehicles":
      return { ...store, vehicles: action.payload };
    case "add_favorite":
      return { ...store, favorites: [...store.favorites, action.payload] };
    case "remove_favorite":
      return {
        ...store,
        favorites: store.favorites.filter(
          f => !(f.uid === action.payload.uid && f.type === action.payload.type)
        )
      };
    default:
      return store;
  }
}

async function fetchDetails(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error fetching details");
    const data = await res.json();
    return data.result.properties;
  } catch {
    return {};
  }
}

export async function storeAsyncDispatch(dispatch, action) {
  const { type, limit = 5 } = action;
  let url = "";

  if (type === "fetch_people") url = "https://www.swapi.tech/api/people";
  if (type === "fetch_planets") url = "https://www.swapi.tech/api/planets";
  if (type === "fetch_vehicles") url = "https://www.swapi.tech/api/vehicles";

  if (!url) return;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error fetching ${type}`);
    const data = await res.json();
    const results = data.results.slice(0, limit);

    const detailedResults = await Promise.all(
      results.map(async item => {
        const properties = await fetchDetails(item.url);
        return {
          uid: item.uid,
          name: item.name,
          type: type.includes("people")
            ? "people"
            : type.includes("planets")
            ? "planets"
            : "vehicles",
          properties
        };
      })
    );

    if (type === "fetch_people") dispatch({ type: "set_people", payload: detailedResults });
    if (type === "fetch_planets") dispatch({ type: "set_planets", payload: detailedResults });
    if (type === "fetch_vehicles") dispatch({ type: "set_vehicles", payload: detailedResults });
  } catch (err) {
    console.error(err);
  }
}