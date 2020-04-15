import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Page } from "../components/Page";

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
	"Long-tailed tit",
];

const Container = styled.div`
	align-items: center;
	color: white;
	display: flex;
	flex-flow: row nowrap;
	font-family: Arial;
	font-size: 2.5rem;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: 100%;
	height: fit-content;

	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const Side = styled.div`
	color: ${(props) => props.theme.accent};
	font-size: 1.2em;
	font-weight: 600;
	transform: ${(props) => (props.active ? "scale(1)" : "scale(0)")};
	transition: transform 0.2s;
`;

const WordDisplay = styled.h2`
	display: inline-block;
	color: ${(props) => props.theme.light};
	margin: 1rem;
`;

const Background = styled.div`
	@keyframes scale-up-center {
		0% {
			transform: scale(0.5);
		}
		100% {
			transform: scale(1);
		}
	}

	align-items: center;
	color: ${(props) => props.theme.dark};
	display: flex;
	font-size: 30rem;
	height: 100%;
	justify-content: center;
	left: 0;
	opacity: 0.4;
	position: absolute;
	top: 0;
	width: 100%;
	z-index: -1;
	/* Source for animation and keyframes: https://animista.net/play/basic/scale-up */
	animation: scale-up-center 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
`;

// Handle switching to next value, and return updated state
const nextValue = (state) => {
	if (!words[state.index + 1]) {
		return {
			...state,
			value: "GameOver",
			gameOver: true,
			side: true,
		};
	} else {
		return {
			...state,
			value: words[state.index + 1].split(" ").join(""), // Set new value
			index: state.index + 1, // Increment index
			side: true, // Reset side
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
				.filter((l) => l.toLowerCase() !== key)
				.join(""),
		};
	} else {
		return {
			...state,
			side: !side,
		};
	}
};

const ExerciseOne = () => {
	const [gameState, setGameState] = useState({
		value: words[0],
		index: 0,
		side: true,
		gameOver: false,
	});

	useEffect(() => {
		// Handle user input
		const onKeyDown = ({ key }) => {
			const newState = deleteLetter(gameState, key);
			setGameState(
				newState.value.length <= 0 ? nextValue(newState) : newState
			);
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
				<Background>
					{gameState.value[
						gameState.side ? 0 : gameState.value.length - 1
					].toUpperCase()}
				</Background>
			</Container>
		</Page>
	);
};

export { ExerciseOne };
