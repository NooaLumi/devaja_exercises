import React from "react";
import { Page } from "../components/Page";
import styled from "styled-components";

const Notice = styled.h2`
	margin-top: 2rem;
	font-size: 2rem;
	text-align: center;
`;

const NotFound = () => {
	return (
		<Page>
			<Notice> 404 Not Found </Notice>
		</Page>
	);
};
export { NotFound };
