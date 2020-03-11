import React from "react";
import styled from "styled-components";
import { Button } from "../components/Button";

const renderItems = (filter, items) =>
	items
		.filter(i => i.topic === filter)
		.sort()
		.reverse()
		.map(i => (
			<Item key={i.date + i.content}>
				<p>
					<ItemProp>Question</ItemProp>: {i.content}
				</p>
				<p>
					<ItemProp>Posted</ItemProp>:{" "}
					{new Date(i.date).toLocaleString("en-FI", {
						// Date formatting options
						hour: "2-digit",
						minute: "2-digit",
						day: "2-digit",
						month: "short",
						timezone: "UTC+2"
					})}
				</p>
			</Item>
		));

const ItemProp = styled.span`
	color: ${props => props.theme.accent};
`;

const Item = styled.li`
	word-wrap: break-word;
	list-style: none;
	padding: 1rem 1.5rem;
	background-color: ${props => props.theme.light};
	color: ${props => props.theme.dark};
	width: 100%;
	height: 100%;
	border-radius: 1rem;
	transition: 0.1s;
	position: relative;
	top: 0;

	&:hover {
		position: relative;
		top: -0.2rem;
	}
`;

const ItemContainer = styled.ul`
	width: 95%;
	margin: 0 auto;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(25ch, 1fr));
	grid-auto-rows: fit-content;
	grid-gap: 0.4rem;
	justify-items: center;
	align-items: center;
	padding: 0.8rem;
	background-color: ${props => props.theme.secondary};
`;

const AddButton = styled(Button)`
	border-radius: 2rem;
	display: inline-block;
	font-size: 2rem;
	line-height: 0;
	margin: 0.5rem auto;
	padding: 1rem 1.3rem;
`;

const ItemDisplay = ({ filter, items, showForm }) => {
	return (
		<ItemContainer>
			{renderItems(filter, items)}
			<AddButton onClick={showForm}>+</AddButton>
		</ItemContainer>
	);
};

export { ItemDisplay };
