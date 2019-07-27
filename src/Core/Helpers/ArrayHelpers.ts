export const isArrayLike = (array: any): array is ArrayLike<number> => {
	return (array.length !== undefined);
};