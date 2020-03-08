import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Menu } from "./pages/Menu";
import { ExerciseOne } from "./pages/ExerciseOne";
import { createGlobalStyle, ThemeProvider } from "styled-components";

// Overwrite browser defaults
const GlobalStyle = createGlobalStyle`
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
`;

// Color scheme for theme provider
const mainTheme = {
	main: "#669D31",
	secondary: "#0B7A75",
	accent: "#DB324D",
	dark: "#394648",
	light: "#EDDDD4"
};

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
					</Switch>
				</ThemeProvider>
			</Router>
		</>
	);
};

export default App;
