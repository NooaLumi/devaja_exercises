import React from "react";
import styled from "styled-components";

const PageContainer = styled.div`
	display: flex;
	flex-flow: column nowrap;
	position: relative;
	height: 100vh;
	width: 100vw;
	background-color: ${props => props.theme.secondary};
	z-index: 1;
`;

const Header = styled.h1`
	display: flex;
	align-items: center;
	height: 35px;
	width: 100%;
	font-family: inherit;
	font-size: 1.5rem;
	color: ${props => props.theme.dark};
	background-color: ${props => props.theme.main};
`;

const Page = ({ children }) => {
	return (
		<PageContainer>
			<Header> </Header>
			{children}
		</PageContainer>
	);
};
export { Page };
