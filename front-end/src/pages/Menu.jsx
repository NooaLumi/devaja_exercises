import React from "react";
import { Link } from "react-router-dom";
import { Page } from "../components/Page";

const Menu = () => {
	return (
		<Page>
			<h3> Exercises: </h3>
			<ul>
				<li>
					<Link to="/exercise1"> Exercise 1</Link>
				</li>
				<li>
					<Link to="/exercise2"> Exercise 2</Link>
				</li>
				<li>
					<Link to="/exercise3"> Exercise 3</Link>
				</li>
			</ul>
		</Page>
	);
};

export { Menu };
