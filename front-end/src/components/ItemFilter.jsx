import React from "react";
import styled from "styled-components";

const FilterContainer = styled.div`
	background-color: ${(props) => props.theme.accent};
	color: ${(props) => props.theme.light};
	width: 95%;
	margin: 2rem auto 0.5rem auto;
	border-radius: 0.5rem;
	border: 0.2rem solid ${(props) => props.theme.dark};
	height: fit-content;
	padding: 0.5rem;
`;

const FilterLabel = styled.label`
	font-size: 1rem;
	margin-left: 0.5rem;
`;

const Filter = styled.select`
	display: inline-block;
	margin-left: 0.5rem;
	padding: 0.2rem 0.5rem;
	border: 0.2rem solid ${(props) => props.theme.dark};
	border-radius: 0.5rem;
	transition: transform 0.1s;
	font-family: inherit;
	background-color: ${(props) => props.theme.light};

	&:hover,
	&:focus {
		cursor: pointer;
		transform: scale(1.1);
		outline: none;
		border-color: ${(props) => props.theme.accent};
	}

	& > * {
		background-color: ${(props) => props.theme.light};
	}
`;

const ItemFilter = ({ onChange }) => {
	return (
		<FilterContainer>
			<FilterLabel htmlFor="filter"> Filter by topic: </FilterLabel>
			<Filter name="filter" id="filter" onChange={onChange}>
				<option value="CSS"> CSS </option>
				<option value="JS"> JS </option>
				<option value="HTML"> HTML </option>
			</Filter>
		</FilterContainer>
	);
};

export { ItemFilter };
