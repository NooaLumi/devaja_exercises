import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

const PageContainer = styled.div`
	display: flex;
	flex-flow: column nowrap;
	position: relative;
	width: 100vw;
	background-color: ${(props) => props.theme.secondary};
	z-index: 1;
`;

const Header = styled.h1`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: 35px;
	width: 100%;
	font-family: inherit;
	font-size: 1rem;
	color: ${(props) => props.theme.dark};
	background-color: ${(props) => props.theme.main};

	& > * {
		margin: 0 0.5rem;
	}
`;

const Page = ({ children }) => {
	return (
		<PageContainer>
			<Header>
				<Link to="/exercise1"> Exercise 1</Link>
				<Link to="/exercise2"> Exercise 2</Link>
				<Link to="/exercise3"> Exercise 3</Link>
			</Header>
			{children}
		</PageContainer>
	);
};
export { Page };
