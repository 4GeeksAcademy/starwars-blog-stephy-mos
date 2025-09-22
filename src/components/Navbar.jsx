import { Link } from "react-router-dom";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer();
  	const [dropdownOpen, setDropdownOpen] = useState(false);
	
	const toggleDropdown = () => {setDropdownOpen(!dropdownOpen);};

	const removeFavorite = (fav) => {
    dispatch({ type: "remove_favorite", payload: fav });
  	};


	return (
		<nav className="navbar navbar-light bg-light mb-4">
			<div className="container d-flex justify-content-between">	
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Star Wars Blog</span>
				</Link>

				<div className="dropdown">
				<button
				className="btn btn-primary dropdown-toggle"
				type="button"
				onClick={toggleDropdown}
				>
				Favorites ({store.favorites.length})
				</button>

				{dropdownOpen && (
				<ul
					className="dropdown-menu dropdown-menu-start show mt-2"
					style={{ minWidth: "250px" }}
				>
					{store.favorites.length === 0 ? (
					<li className="dropdown-item text-muted">empty</li>
					) : (
					store.favorites.map((fav, index) => (
						<li
						key={index}
						className="dropdown-item d-flex justify-content-between align-items-center"
						>
						<Link
							to={`/single/${fav.type}/${fav.uid}`}
							className="text-decoration-none flex-grow-1 me-2"
							onClick={() => setDropdownOpen(false)}
						>
							{fav.name}
						</Link>
						<button
							className="btn btn-sm btn-outline-danger"
							onClick={() => removeFavorite(fav)}
						>
							<FontAwesomeIcon icon={faTrash} />
						</button>
						</li>
						))
					)}
				</ul>
				)}
				</div>
			</div>
		</nav>
	);
};