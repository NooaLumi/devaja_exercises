import React, { useState, useEffect } from "react";

import { ItemForm } from "../components/ItemForm";
import { ItemFilter } from "../components/ItemFilter";
import { ItemDisplay } from "../components/ItemDisplay";
import { Page } from "../components/Page";

// Localstorage substitute
const storage = [];

// Get items from local storage
const getItems = () =>
	typeof localStorage !== "undefined"
		? localStorage.getItem("questions")
			? JSON.parse(localStorage.getItem("questions"))
			: []
		: storage;

// Add an item to local storage
const addItem = item => {
	const { content, topic } = item;
	if (typeof localStorage !== "undefined") {
		localStorage.setItem(
			"questions",
			JSON.stringify(
				getItems().concat({
					date: new Date(),
					content,
					topic
				})
			)
		);
	} else {
		storage.push({
			date: new Date(),
			content,
			topic
		});
	}
};

const ExerciseTwo = () => {
	const [filter, setFilter] = useState("CSS");
	const [items, setItems] = useState([]);
	const [showForm, setShowForm] = useState(false);

	// Get initial items
	useEffect(() => setItems(getItems()), []);

	const onItemSubmit = content => {
		addItem({
			topic: filter,
			content
		});
		setItems(getItems());
	};

	return (
		<Page>
			<ItemForm
				onSubmit={onItemSubmit}
				visible={showForm}
				show={setShowForm}
			/>
			<ItemFilter onChange={({ target }) => setFilter(target.value)} />
			<ItemDisplay
				filter={filter}
				items={items}
				showForm={() => setShowForm(true)}
			/>
		</Page>
	);
};

export { ExerciseTwo };
