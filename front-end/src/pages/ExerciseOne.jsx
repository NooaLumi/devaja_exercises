import React, { useState, useEffect } from "react";
import styled from "styled-components";

const words = [
	"Robin",
	"House sparrow",
	"Starling",
	"Blackbird",
	"Blue tit",
	"Wood pigeon",
	"Goldfinch",
	"Great tit",
	"Chaffinch",
	"Long-tailed tit"
];

const Page = styled.div`
	display: flex;
	flex-flow: column nowrap;
	height: 100vh;
	width: 100vw;
	background-color: ${props => props.theme.secondary};
`;

const Container = styled.div`
	align-items: center;
	color: white;
	display: flex;
	flex-flow: row nowrap;
	font-family: Arial;
	font-size: 2.5rem;
	height: 100%;
	justify-content: center;
	text-align: center;
	width: 100%;
`;

const Side = styled.div`
	color: ${props => props.theme.accent};
	font-size: 1.2em;
	font-weight: 600;
	transform: ${props => (props.active ? "scale(1)" : "scale(0)")};
	transition: transform 0.2s;
`;

const WordDisplay = styled.h2`
	display: inline-block;
	color: ${props => props.theme.light};
	margin: 1rem;
`;

// Handle switching to next value, and return updated state
const nextValue = state => {
	if (!words[state.index + 1]) {
		return {
			...state,
			value: undefined,
			gameOver: true
		};
	} else {
		return {
			...state,
			value: words[state.index + 1].split(" ").join(""), // Set new value
			index: state.index + 1, // Increment index
			side: true // Reset side
		};
	}
};

// Handle key press and return updated state
const deleteLetter = (state, key) => {
	const { value, side } = state;

	// Check if current letter equals key
	if (value[side ? 0 : value.length - 1].toLowerCase() === key) {
		return {
			...state,
			side: !side,
			// Delete key from value
			value: value
				.split("")
				.filter(l => l.toLowerCase() !== key)
				.join("")
		};
	} else {
		return {
			...state,
			side: !side
		};
	}
};

const ExerciseOne = () => {
	const [gameState, setGameState] = useState({
		value: words[0],
		index: 0,
		side: true,
		gameOver: false
	});

	useEffect(() => {
		// Handle user input
		const onKeyDown = ({ key }) => {
			if (!gameState.gameOver) {
				const newState = deleteLetter(gameState, key);
				setGameState(
					newState.value.length <= 0 ? nextValue(newState) : newState
				);
			}
		};

		// Listen to user input
		window.addEventListener("keydown", onKeyDown);

		return () => {
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [gameState]);

	return (
		<Page>
			<Container>
				<Side active={gameState.side}> &gt; </Side>
				<WordDisplay>{gameState.value} </WordDisplay>
				<Side active={!gameState.side}> &lt; </Side>
			</Container>
		</Page>
	);
};

export { ExerciseOne };
