import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const GRIDSIZE = 8;

const Grid = styled.canvas`
	display: block;
	margin: 0 auto;
	border: 0.2rem solid ${props => props.theme.dark};
`;

// Drawing utility functions
const clearScreen = (ctx, size) => ctx.clearRect(0, 0, size, size);
const getSquareX = (i, size) => Math.floor(i % 8) * size;
const getSquareY = (i, size) => Math.floor(i / 8) * size;
const drawSquare = (sX, sY, size, ctx) => ctx.fillRect(sX, sY, size, size);

const drawGrid = (squares, squareSize, ctx) => {
	squares.forEach((s, i) => {
		const sX = getSquareX(i, squareSize);
		const sY = getSquareY(i, squareSize);
		drawSquare(sX, sY, squareSize, ctx);
		ctx.clearRect(sX + 1, sY + 1, squareSize - 2, squareSize - 2);
	});
};

const drawSquares = (squares, squareSize, ctx) =>
	squares.map(
		(s, i) =>
			s === true &&
			drawSquare(
				getSquareX(i, squareSize),
				getSquareY(i, squareSize),
				squareSize,
				ctx
			)
	);

// Return index of square that is moused over
const checkCollision = (mouse, squares, squareSize) => {
	let collidee = null;
	squares.forEach((s, i) => {
		const sX = getSquareX(i, squareSize);
		if (mouse.x > sX && mouse.x < sX + squareSize) {
			const sY = getSquareY(i, squareSize);
			if (mouse.y > sY && mouse.y < sY + squareSize) {
				collidee = i;
			}
		}
	});
	return collidee;
};

const updateDisplay = (ctx, screenSize, squares, squareSize) => {
	clearScreen(ctx, screenSize);
	drawGrid(squares, squareSize, ctx);
	drawSquares(squares, squareSize, ctx);
};

const getMouse = (e, canvasEl) => {
	const canvas = canvasEl.getBoundingClientRect();
	return {
		x: e.clientX - canvas.left,
		y: e.clientY - canvas.top
	};
};

const ExerciseThree = () => {
	const canvasEl = useRef(null);
	const [squares, setSquares] = useState(
		new Array(Math.pow(GRIDSIZE, 2)).fill(false)
	);
	const [mode, setMode] = useState("ADD");

	const [mouse, setMouse] = useState({
		clicked: false,
		x: 0,
		y: 0,
		mousedOver: []
	});

	useEffect(() => {
		console.log("RENDER");
		const canvas = canvasEl.current;

		// Resize canvas
		canvas.width = canvas.height =
			Math.min(window.innerWidth, window.innerHeight) / 1.5;

		const ctx = canvas.getContext("2d");
		const squareSize = canvas.width / GRIDSIZE;

		updateDisplay(ctx, canvas.width, squares, squareSize);

		// Handle mouse events
		const onMouseMove = e => {
			if (mouse.clicked) {
				const index = checkCollision(
					getMouse(e, canvas),
					squares,
					squareSize
				);
				if (
					Number.isInteger(index) &&
					!mouse.mousedOver.includes(index)
				) {
					// Update state
					setSquares(
						squares.map((s, i) => {
							if (i === index) {
								return mode === "ADD"
									? true
									: mode === "REMOVE"
									? false
									: s;
							} else {
								return s;
							}
						})
					);

					setMouse({
						...mouse,
						mousedOver: mouse.mousedOver.concat(index)
					});
				}
			}
		};

		const onMouseDown = e => {
			const index = checkCollision(
				getMouse(e, canvas),
				squares,
				squareSize
			);
			setMode(
				Number.isInteger(index)
					? squares[index] === false
						? "ADD"
						: "REMOVE"
					: "NONE"
			);
			setMouse({ ...mouse, clicked: true });
		};

		const onMouseUp = e => {
			// Add current spot to mousedOver ( in case mousemove did not trigger )
			const index = checkCollision(
				getMouse(e, canvas),
				squares,
				squareSize
			);
			if (Number.isInteger(index) && !mouse.mousedOver.includes(index)) {
				setSquares(
					squares.map((s, i) => {
						if (i === index) {
							return mode === "ADD"
								? true
								: mode === "REMOVE"
								? false
								: s;
						} else {
							return s;
						}
					})
				);
			}

			// Update state
			setMouse({ ...mouse, mousedOver: [], clicked: false });
		};

		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mousedown", onMouseDown);
		window.addEventListener("mouseup", onMouseUp);

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mousedown", onMouseDown);
			window.removeEventListener("mouseup", onMouseUp);
		};
	}, [mouse, squares, mode]);

	return <Grid ref={canvasEl}></Grid>;
};
export { ExerciseThree };
