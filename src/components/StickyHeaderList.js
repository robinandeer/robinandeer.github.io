import React from "react";
import styled from "styled-components";

const List = styled.ul``;
List.Group = styled.div`
	padding-bottom: ${props => props.theme.spacing.smaller};
`;
List.Header = styled.div`
	position: -webkit-sticky;
	position: sticky;
	top: ${props => props.theme.spacing.smaller};
`;
List.Item = styled.li`
	&:first-of-type {
		margin-top: ${props => props.theme.spacing.smaller};
	}
`;

const StickyListHeader = ({ renderHeader, renderItem, groups, className }) => (
	<List className={className}>
		{groups.map(group => (
			<List.Group key={group.title}>
				<List.Header>{renderHeader(group.title)}</List.Header>
				{group.items.map((item, index) => (
					<List.Item key={index}>{renderItem(item)}</List.Item>
				))}
			</List.Group>
		))}
	</List>
);

export default StickyListHeader;
