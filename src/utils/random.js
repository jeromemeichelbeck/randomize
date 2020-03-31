export const randomInt = (min, max) => Math.floor(Math.random() * (+max - +min + 1) + +min)

export const randomFloat = (min, max) => Math.random() * (+max - +min) + +min

export const randomColor = (typeOfColor) => {
	const colors = Array.from({ length: 3 }, () => randomInt(0, 255))
	if (typeOfColor === 'rgb') return `rgb(${colors.join(', ')})`
	if (typeOfColor === 'hex') return `#${colors.map((color) => color.toString(16).padStart(2, '0')).join('')}`
}

export const randomFromLength = (length, randomFunction, ...args) => {
	const result = []

	for (let i = 0; i < length; i++) {
		result.push(randomFunction(...args))
	}

	return result
}

export const randomFromList = (list) => list[randomInt(0, list.length - 1)].trim()
