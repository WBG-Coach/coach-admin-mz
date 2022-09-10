import styled from 'styled-components';

export const StyledPaginatorContainer = styled.div`
	width: 100%;
	display: flex;
	padding: 8px 0px;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	background-color: #ffffff;
`;

export const StyledPaginatorButton = styled.button`
	height: 28px;
	width: 28px;
	border: none;
	display: flex;
	cursor: pointer;
	margin-left: 12px;
	align-items: center;
	justify-content: center;
	background-color: #ffffff;
	transition: all 300ms;

	&:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}

	&:disabled {
		opacity: 0.5;
	}
`;
