import styled from "styled-components";

const Button = styled.button`
	border-radius: 0.5rem;
	border: 0.2rem solid ${props => props.theme.dark};
	background-color: ${props => props.theme.light};
	margin: 0.5rem;
	margin-top: 1.5rem;
	padding: 0.4rem 1rem;
	transition: transform 0.1s;
	font-family: inherit;
	color: ${props => props.theme.dark};

	&:focus,
	&:hover {
		outline: none;
		transform: scale(1.1);
		border-color: ${props => props.theme.accent};
		cursor: pointer;
	}
`;

export { Button };
