import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Page } from "../components/Page";
import { Drawing } from "../components/Drawing";
import { DrawingDisplay } from "../components/DrawingDisplay";

import {
	GRIDSIZE,
	getSquareX,
	getSquareY,
	clearScreen,
	drawGrid,
	drawSquares,
} from "../utils/drawGrid";

const Grid = styled.canvas`
	display: block;
	margin: 0 auto;
	margin-top: 2rem;
	border: 0.2rem solid ${(props) => props.theme.dark};
	background: ${(props) => props.theme.light};
`;

const SaveBtn = styled.button`
	margin-top: 1rem;
	width: 18%;
	margin: 0 auto;
	font-size: 1.3rem;
	font-family: inherit;
	padding: 0.3rem;
	margin-top: 0.5rem;
	color: ${(props) => props.theme.light};
	background-color: ${(props) => props.theme.main};
	border: 2px solid ${(props) => props.theme.dark};
	cursor: pointer;
	transition: border-color 0.2s, background-color 0.2s;

	&:hover,
	&:focus {
		border-color: ${(props) => props.theme.main};
		background-color: ${(props) => props.theme.dark};
		outline: none;
	}
`;

// Return index of square that is moused over
const checkCollision = (mouse, squares, sSize) => {
	let collidee = null;
	squares.forEach((s, i) => {
		const sX = getSquareX(i, sSize);
		if (mouse.x > sX && mouse.x < sX + sSize) {
			const sY = getSquareY(i, sSize);
			if (mouse.y > sY && mouse.y < sY + sSize) {
				collidee = i;
			}
		}
	});
	return collidee;
};

const updateDisplay = (ctx, screenSize, squares, sSize) => {
	clearScreen(ctx, screenSize);
	drawGrid(squares, sSize, ctx);
	drawSquares(squares, sSize, ctx);
};

const getMouse = (e, canvasEl) => {
	const canvas = canvasEl.getBoundingClientRect();
	return {
		x: e.clientX - canvas.left,
		y: e.clientY - canvas.top,
	};
};

// Return new mode according to square
const updateSquareState = (s, mode) =>
	mode === "ADD" ? true : mode === "REMOVE" ? false : s;

const resizeCanvas = (canvas) => {
	canvas.width = canvas.height =
		Math.min(window.innerWidth, window.innerHeight) / 1.5;
};

const ExerciseThree = () => {
	const canvasEl = useRef(null);

	// 8 x 8 binary grid as array
	const [squares, setSquares] = useState(
		new Array(Math.pow(GRIDSIZE, 2)).fill(false)
	);

	// Drawing mode ( "ADD", "REMOVE", "NONE")
	const [mode, setMode] = useState("ADD");

	const [mouse, setMouse] = useState({
		clicked: false,
		mousedOver: [],
	});

	const copyContent = (squares) => {
		setSquares(squares);
	};

	const saveDrawing = async () => {
		const res = await fetch("/api/drawings", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ squares: squares }),
		});
		window.location.reload();
	};

	useEffect(() => {
		const canvas = canvasEl.current;
		const ctx = canvas.getContext("2d");

		resizeCanvas(canvas);
		const squareSize = canvas.width / GRIDSIZE;
		updateDisplay(ctx, canvas.width, squares, squareSize);

		const onWindowResize = (e) => {
			resizeCanvas(canvas);
			updateDisplay(ctx, canvas.width, squares, canvas.width / GRIDSIZE);
		};

		const onMouseMove = (e) => {
			// Do nothing if mouse isn't clicked
			if (!mouse.clicked) {
				return;
			}

			const index = checkCollision(
				getMouse(e, canvas),
				squares,
				squareSize
			);
			if (Number.isInteger(index) && !mouse.mousedOver.includes(index)) {
				// Set current square state according to mode
				setSquares(
					squares.map((s, i) =>
						i === index ? updateSquareState(s, mode) : s
					)
				);

				// Add moused over square to mouse state
				setMouse({
					...mouse,
					mousedOver: mouse.mousedOver.concat(index),
				});
			}
		};

		const onMouseDown = (e) => {
			const index = checkCollision(
				getMouse(e, canvas),
				squares,
				squareSize
			);

			// Set mode according to square below
			setMode(
				!isNaN(index)
					? squares[index] === false
						? "ADD"
						: "REMOVE"
					: "NONE"
			);
			setMouse({ ...mouse, clicked: true });
		};

		const onMouseUp = (e) => {
			// Add current spot to mousedOver in case mousemove did not trigger
			const index = checkCollision(
				getMouse(e, canvas),
				squares,
				squareSize
			);
			if (!isNaN(index) && !mouse.mousedOver.includes(index)) {
				// Set current square state according to mode
				setSquares(
					squares.map((s, i) =>
						i === index ? updateSquareState(s, mode) : s
					)
				);
			}

			// Clear mousedOver array
			setMouse({ ...mouse, mousedOver: [], clicked: false });
		};

		// Register event listeners
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mousedown", onMouseDown);
		window.addEventListener("mouseup", onMouseUp);
		window.addEventListener("resize", onWindowResize);

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mousedown", onMouseDown);
			window.removeEventListener("mouseup", onMouseUp);
			window.removeEventListener("resize", onWindowResize);
		};
	}, [mouse, squares, mode]);

	return (
		<Page>
			<Grid ref={canvasEl}></Grid>
			<SaveBtn onClick={saveDrawing}> Save </SaveBtn>
			<DrawingDisplay copyClick={copyContent} />
		</Page>
	);
};
export { ExerciseThree };
