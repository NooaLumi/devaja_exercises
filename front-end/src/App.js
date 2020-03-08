import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Menu } from "./pages/Menu";
import { ExerciseOne } from "./pages/ExerciseOne";

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" children={<ExerciseOne />} />
			</Switch>
		</Router>
	);
};

export default App;
