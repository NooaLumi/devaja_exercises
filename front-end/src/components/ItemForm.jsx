import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "./Button";

const FormContainer = styled.div`
	@keyframes fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	/* Source for animation and keyframes: https://animista.net/play/basic/scale-up */
	animation: fade-in 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;

	position: fixed;
	top: 0;
	left: 0;
	z-index: 2;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.8);
`;

const Form = styled.form`
	align-items: center;
	background-color: ${(props) => props.theme.main};
	border-radius: 2rem;
	border: 0.2rem solid ${(props) => props.theme.dark};
	color: ${(props) => props.theme.dark};
	display: flex;
	flex-flow: column nowrap;
	height: 50%;
	justify-content: center;
	margin: 0 auto;
	position: relative;
	top: 50%;
	transform: translate(0, -50%);
	width: 80%;
`;

const QuestionField = styled.textarea`
	padding: 0.6em 1.33rem;
	margin: 0.5rem;
	border: 0.2rem solid ${(props) => props.theme.dark};
	color: ${(props) => props.theme.dark};
	background-color: ${(props) => props.theme.light};
	border-radius: 0.5rem;
	width: 70%;
	height: 50%;
	font-size: 1rem;
	font-family: inherit;
	transition: 0.2s;

	&:focus {
		border-color: ${(props) => props.theme.accent};
		outline: none;
		width: 75%;
		height: 55%;
	}
`;

const QuestionLabel = styled.label`
	font-size: 1.2rem;
	margin-top: 0.5rem;
`;

const ItemForm = ({ onSubmit, visible, show }) => {
	const [question, setQuestion] = useState("");

	const onItemSubmit = (e) => {
		e.preventDefault();
		onSubmit(question);
		setQuestion("");
		show(false);
	};

	const hideForm = () => {
		setQuestion("");
		show(false);
	};

	return (
		<>
			{visible && (
				<FormContainer>
					<Form onSubmit={onItemSubmit}>
						<QuestionLabel htmlFor="question">
							Question:
						</QuestionLabel>
						<QuestionField
							required
							name="question"
							id="question"
							rows="3"
							value={question}
							onChange={({ target }) => setQuestion(target.value)}
						></QuestionField>
						<div>
							<Button type="submit">+ SAVE</Button>
							<Button type="reset" onClick={hideForm}>
								-️ CANCEL
							</Button>
						</div>
					</Form>
				</FormContainer>
			)}
		</>
	);
};
export { ItemForm };
