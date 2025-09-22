// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import rigoImageUrl from "../assets/img/rigo-baby.jpg"  // Import an image asset
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state
import { useEffect, useState } from "react"; 

// Define and export the Single component which displays individual item details.
export const Single = () => {
  // Access the global state using the custom hook.
    const { store } = useGlobalReducer()

  // Retrieve the 'theId' URL parameter using useParams hook.
  // const { theId } = useParams()
  // const singleTodo = store.todos.find(todo => todo.id === parseInt(theId));

    const { type, uid } = useParams()

    const [details, setDetails] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
        async function fetchDetails() {
            try {
                setLoading(true);
                const res = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
                if (!res.ok) throw new Error("Error fetching details");
                const data = await res.json();
                setDetails(data.result); 
            } catch (err) {
                console.error("Error loading details:", err);
                setError("Failed to load details.");
            } finally {
                setLoading(false);
            }
        }
        fetchDetails();
    }, [type, uid]);


  return (
    <div className="container text-center">
      {/* Display the title of the todo element dynamically retrieved from the store using theId. */}
      {/* <h1 className="display-4">Todo: {singleTodo?.title}</h1> */}
      {/* <hr className="my-4" />  A horizontal rule for visual separation. */}

      {loading && <p>Loading details...</p>}
      {error && <p className="text-danger">{error}</p>}

      {details && (
        <>
          
          <div 
            className="d-flex align-items-center mb-5 flex-row flex-nowrap" 
            style={{ gap: "2rem" }}
          >
            <div className="flex-shrink-0 text-center">
              <img
                src={`https://placehold.co/300x300/000000/FFFFFF.png?text=${encodeURIComponent(details.properties?.name)}`}
                alt={details.properties?.name}
                className="img-fluid"
              />
            </div>
            <div className="flex-grow-1 text-center">
              <h1 className="display-4 mb-3">{details.properties?.name}</h1>
              <p className="lead">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Curabitur accumsan lacus vel ex porta, non tristique purus facilisis. 
                Sed vulputate tincidunt ex, sed lacinia nunc consequat in. 
                Aliquam erat volutpat. Donec in turpis a justo varius ullamcorper. 
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
                Integer ac dolor ut nisl dictum vehicula.
              </p>
            </div>
          </div>

          <hr className="mb-4" />

        
          <div className="d-flex justify-content-center flex-wrap mb-5">
            {Object.entries(details.properties)
              .filter(([key]) => key !== "created" && key !== "edited")
              .slice(0, 5)
              .map(([key, value], index, arr) => (
                <span key={key} className="mx-2">
                  <strong className="text-capitalize">{key}:</strong> {value}
                  {index < arr.length - 1 && " | "}
                </span>
              ))
            }
          </div>
        </>
      )}

      {/* A Link component acts as an anchor tag but is used for client-side routing to prevent page reloads. */}
      <div className="text-center mt-5">
        <Link to="/">
          <span className="btn btn-primary btn-lg" role="button">
            Back home
          </span>
        </Link>
      </div>
    
    </div>
  );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
Single.propTypes = {
  // Although 'match' prop is defined here, it is not used in the component.
  // Consider removing or using it as needed.
  match: PropTypes.object
};
