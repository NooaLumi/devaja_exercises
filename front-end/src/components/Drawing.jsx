import React, { useRef } from "react";
import styled from "styled-components";
import { useEffect } from "react";

import { GRIDSIZE, clearScreen, drawSquares } from "../utils/drawGrid";

const updateDisplay = (ctx, screenSize, squares, sSize) => {
	clearScreen(ctx, screenSize);
	drawSquares(squares, sSize, ctx);
};

const resizeCanvas = (canvas) => {
	canvas.width = canvas.height =
		Math.min(window.innerWidth, window.innerHeight) / 6;
};

const Grid = styled.canvas`
	display: block;
	width: fit-content;
	background: ${(props) => props.theme.light};
`;

const Drawing = ({ squares, onClick, className }) => {
	const canvasEl = useRef(null);

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

		window.addEventListener("resize", onWindowResize);
		return () => window.removeEventListener("resize", onWindowResize);
	}, [squares]);

	return (
		<Grid
			ref={canvasEl}
			className={className}
			onClick={() => onClick(squares)}
		/>
	);
};
export { Drawing };
