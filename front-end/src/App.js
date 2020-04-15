import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Menu } from "./pages/Menu";
import { ExerciseOne } from "./pages/ExerciseOne";
import { ExerciseTwo } from "./pages/ExerciseTwo";
import { ExerciseThree } from "./pages/ExerciseThree";

import { createGlobalStyle, ThemeProvider } from "styled-components";

// Color scheme for theme provider
const mainTheme = {
	main: "#669D31",
	secondary: "#0B7A75",
	accent: "#DB324D",
	dark: "#394648",
	light: "#EDDDD4",
};

// Overwrite browser defaults
const GlobalStyle = createGlobalStyle`
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	:root {
		font-family: "Raleway", Arial, Helvetica, sans-serif;
	}

	body {
		background: ${mainTheme.secondary};
	}
`;

const App = () => {
	return (
		<>
			<GlobalStyle />
			<Router>
				<ThemeProvider theme={mainTheme}>
					<Switch>
						<Route exact path="/" children={<Menu />} />
						<Route exact path="/exercise1">
							<ExerciseOne />
						</Route>
						<Route exact path="/exercise2">
							<ExerciseTwo />
						</Route>
						<Route exact path="/exercise3">
							<ExerciseThree />
						</Route>
					</Switch>
				</ThemeProvider>
			</Router>
		</>
	);
};

export default App;
