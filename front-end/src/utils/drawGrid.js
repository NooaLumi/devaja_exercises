const GRIDSIZE = 8;

const getSquareX = (i, size) => Math.floor(i % GRIDSIZE) * size;
const getSquareY = (i, size) => Math.floor(i / GRIDSIZE) * size;
const drawSquare = (sX, sY, size, ctx) => ctx.fillRect(sX, sY, size, size);
const clearScreen = (ctx, size) => ctx.clearRect(0, 0, size, size);

const drawGrid = (squares, sSize, ctx) => {
	squares.forEach((s, i) => {
		const [sX, sY] = [getSquareX(i, sSize), getSquareY(i, sSize)];
		drawSquare(sX, sY, sSize, ctx);
		ctx.clearRect(sX + 1, sY + 1, sSize - 2, sSize - 2);
	});
};

const drawSquares = (squares, sSize, ctx) => {
	squares.forEach((s, i) => {
		s === true &&
			drawSquare(getSquareX(i, sSize), getSquareY(i, sSize), sSize, ctx);
	});
};

export {
	GRIDSIZE,
	getSquareX,
	getSquareY,
	drawSquare,
	clearScreen,
	drawGrid,
	drawSquares,
};
