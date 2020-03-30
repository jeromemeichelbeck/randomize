export default (word) =>
	word
		.split('-')
		.map((item) => item[0].toUpperCase() + item.slice(1))
		.join(' ')
