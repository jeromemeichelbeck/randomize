export const randomInt = (min, max) => Math.floor(Math.random() * (+max - +min + 1) + +min)

export const randomFloat = (min, max) => Math.random() * (+max - +min) + +min

export const randomFromLength = (min, max, length, randomFunction) => {
	const result = []

	for (let i = 0; i < length; i++) {
		result.push(randomFunction(min, max))
	}

	return result
}

export const randomFromList = (length, list) => {
	const result = []
	const [min, max] = [0, list.length - 1]

	for (let i = 0; i < length; i++) {
		result.push(list[randomInt(min, max)])
	}

	return result
}
