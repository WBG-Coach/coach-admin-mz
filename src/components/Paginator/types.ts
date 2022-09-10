export type PaginatorProps = {
	totalItems: number;
	currentPage: number;
	itemsPerPage: number;
	onChangePage: (newPage: number) => void;
	onChangeItemsPerPage: (itemsPerPage: number) => void;
};
