import React, { useEffect, useState } from "react";
import { Drawing } from "../components/Drawing";
import styled from "styled-components";

const Container = styled.div`
	width: 90%;
	margin: 0 auto;
	display: flex;
	flex-flow: row wrap;
	align-items: center;
	justify-content: center;

	margin-top: 2rem;
`;

const StyledDrawing = styled(Drawing)`
	margin: 0 0.5rem;
	margin-bottom: 0.5rem;
	&:hover {
		cursor: pointer;
	}
`;

const DrawingDisplay = ({ copyClick }) => {
	const [drawings, setDrawings] = useState([]);

	useEffect(() => {
		const getDrawings = async () => {
			const res = await fetch("/api/drawings");
			const drawings = await res.json();
			return drawings.map((d) => d.squares).reverse();
		};
		getDrawings().then((d) => {
			setDrawings(d);
		});
	}, []);

	const renderDrawings = () => {
		return drawings.map((d, i) => (
			<StyledDrawing squares={d} key={i} onClick={copyClick} />
		));
	};
	return <Container> {renderDrawings()}</Container>;
};
export { DrawingDisplay };
