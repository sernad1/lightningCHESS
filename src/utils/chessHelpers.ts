export function getRowAndColumn(address: string){
	const column = address[0];
	const row = parseInt(address[1], 10);
	return {row, column};
}
