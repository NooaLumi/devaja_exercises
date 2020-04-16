import React from "react";
import styled from "styled-components";

import { NavLink } from "react-router-dom";

const PageContainer = styled.div`
	display: flex;
	flex-flow: column nowrap;
	position: relative;
	width: 100vw;
	background-color: ${(props) => props.theme.secondary};
	z-index: 1;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 35px;
	width: 100%;
	font-family: inherit;
	background-color: ${(props) => props.theme.main};
`;

const Nav = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	height: 100%;
	width: fit-content;
	font-size: 1rem;
	color: ${(props) => props.theme.dark};
	margin-right: 1.5rem;

	& > .is-active {
		color: ${(props) => props.theme.accent};
	}

	& > * {
		user-select: none;
		margin: 0 0.5rem;
		text-decoration: none;
		color: ${(props) => props.theme.dark};
		&:focus {
			color: ${(props) => props.theme.secondary};
		}
	}
`;

const Logo = styled.h1`
	color: ${(props) => props.theme.dark};
	font-size: 1.3rem;
	margin-left: 1.5rem;
	font-weight: normal;
	user-select: none;
`;

const Page = ({ children }) => {
	return (
		<PageContainer>
			<Header>
				<Logo>Devaja Exercises</Logo>
				<Nav>
					<NavLink activeClassName="is-active" to="/exercise1">
						Exercise 1
					</NavLink>
					<NavLink activeClassName="is-active" to="/exercise2">
						Exercise 2
					</NavLink>
					<NavLink activeClassName="is-active" to="/exercise3">
						Exercise 3
					</NavLink>
				</Nav>
			</Header>
			{children}
		</PageContainer>
	);
};
export { Page };
