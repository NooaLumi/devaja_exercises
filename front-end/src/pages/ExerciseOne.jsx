import React, { useState, useEffect } from "react";

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
		<div>
			<p>
				{gameState.side && <span> &gt; </span>}
				{gameState.value}
				{!gameState.side && <span> &lt; </span>}
			</p>
		</div>
	);
};

export { ExerciseOne };
