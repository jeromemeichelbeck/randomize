import React, { useState } from 'react'

import capitalize from '../../utils/capitalize'
import { randomInt, randomFloat, randomColor, randomFromList, randomFromLength } from '../../utils/random'

import './form.scss'

export const Form = () => {
	const [type, setType] = useState(null)
	const [oneOrMany, setOneOrMany] = useState(null)
	const [listLength, setListLength] = useState(10)
	const [list, setList] = useState([])
	const [typeOfNumber, setTypeOfNumber] = useState(null)
	const [from, setFrom] = useState(0)
	const [to, setTo] = useState(100)
	const [typeOfColor, setTypeOfColor] = useState(null)
	const [errors, setErrors] = useState([])
	const [result, setResult] = useState([])

	const showButton =
		type &&
		oneOrMany &&
		(listLength || oneOrMany === 'one') &&
		(typeOfNumber || type !== 'number') &&
		(typeOfColor || type !== 'color')

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()

				const newErrors = []

				if (oneOrMany === 'many' && !listLength) {
					newErrors.push({
						element: 'list-length',
						card: 'many',
						message: `The length of the list can't be empty`
					})
				}

				switch (type) {
					case 'number':
						if (!from && from !== 0) {
							newErrors.push({
								element: 'from',
								card: 'from-to',
								message: `The "from" field can't be empty`
							})
						}
						if (!to && to !== 0) {
							newErrors.push({
								element: 'to',
								card: 'from-to',
								message: `The "to" field can't be empty`
							})
						}
						if (from !== '' && to !== '' && to <= from) {
							newErrors.push({
								element: 'to',
								card: 'from-to',
								message: `The "to" field can't be inferior or equal to "from" field`
							})
						}

						setErrors(newErrors)

						if (newErrors.length === 0) {
							// Just one number
							if (oneOrMany === 'one') {
								if (typeOfNumber === 'integer') setResult([randomInt(from, to)])
								else if (typeOfNumber === 'real') setResult([randomFloat(from, to)])
								else setErrors([{ message: 'Unexpected error' }])
							} else if (oneOrMany === 'many') {
								if (typeOfNumber === 'integer')
									setResult(randomFromLength(listLength, randomInt, from, to))
								else if (typeOfNumber === 'real')
									setResult(randomFromLength(listLength, randomFloat, from, to))
								else setErrors([{ message: 'Unexpected error' }])
							} else {
								setErrors([{ message: 'Unexpected error' }])
							}
						}
						break
					case 'color':
						if (oneOrMany === 'one') setResult([randomColor(typeOfColor)])
						else if (oneOrMany === 'many') setResult(randomFromLength(listLength, randomColor, typeOfColor))

						break
					case 'custom-item':
						if (list.length === 0) {
							newErrors.push({
								element: 'list',
								card: 'list-card',
								message: `List of items can't be empty`
							})
						}

						setErrors(newErrors)

						if (newErrors.length === 0) {
							if (oneOrMany === 'one') setResult([randomFromList(list)])
							else if (oneOrMany === 'many') setResult(randomFromLength(listLength, randomFromList, list))
							else setErrors([{ message: 'Unexpected error' }])
						}
						break
					default:
						break
				}
			}}
		>
			{/* Errors */}
			{errors.length > 0 && (
				<ul className="errors">
					{errors.map((error) => (
						<li key={error.element}>{error.message}</li>
					))}
				</ul>
			)}
			{/* Type */}
			<fieldset>
				<legend>What type of random thing do you want to get?</legend>
				<div className="cards">
					<input
						type="radio"
						id="number"
						value="number"
						checked={type === 'number'}
						onChange={() => setType('number')}
					/>
					<label className="card" htmlFor="number">
						Number
					</label>
					{/* <input
						type="radio"
						id="word"
						value="word"
						checked={type === 'word'}
						onChange={() => setType('word')}
					/>
					<label className="card" htmlFor="word">
						Word
					</label> */}
					<input
						type="radio"
						id="color"
						value="color"
						checked={type === 'color'}
						onChange={() => setType('color')}
					/>
					<label className="card" htmlFor="color">
						Color
					</label>
					<input
						type="radio"
						id="custom-item"
						value="custom-item"
						checked={type === 'custom-item'}
						onChange={() => setType('custom-item')}
					/>
					<label className="card" htmlFor="custom-item">
						Custom Item
					</label>
				</div>
			</fieldset>
			{/* On or Many */}
			<fieldset className={type ? '' : 'hidden'}>
				<div className="cards">
					<input
						type="radio"
						id="one"
						value="one"
						checked={oneOrMany === 'one'}
						onChange={() => setOneOrMany('one')}
					/>
					{type && (
						<label className="card" htmlFor="one">
							Just One {capitalize(type)}
						</label>
					)}
					<input
						type="radio"
						id="many"
						value="many"
						checked={oneOrMany === 'many'}
						onChange={() => {
							setOneOrMany('many')
						}}
					/>
					{type && (
						<label
							className={`card${errors.findIndex((error) => error.card === 'many') > -1 ? ' empty' : ''}`}
							htmlFor="many"
						>
							<label htmlFor="list-length">A list of {capitalize(type)}s</label>
							<input
								className={
									'flex' +
									(errors.findIndex((error) => error.element === 'list-length') > -1 ? ' empty' : '')
								}
								type="number"
								id="list-length"
								value={listLength}
								min="1"
								step="1"
								onChange={(e) => setListLength(e.target.value)}
								disabled={oneOrMany !== 'many'}
							/>
						</label>
					)}
				</div>
			</fieldset>
			{/* Case number */}
			<fieldset className={`big${type === 'number' ? '' : ' hidden'}`}>
				<div className="cards">
					<input
						type="radio"
						id="integer"
						value="integer"
						checked={typeOfNumber === 'integer'}
						onChange={() => setTypeOfNumber('integer')}
					/>
					<label className="card" htmlFor="integer">
						Integer
					</label>
					<input
						type="radio"
						id="real"
						value="real"
						checked={typeOfNumber === 'real'}
						onChange={() => setTypeOfNumber('real')}
					/>
					<label className="card" htmlFor="real">
						Real Number
					</label>
				</div>
				<div
					className={`card big${errors.findIndex((error) => error.card === 'from-to') > -1 ? ' empty' : ''}`}
				>
					<div className="form-group">
						<label htmlFor="from">From</label>
						<input
							className={errors.findIndex((error) => error.element === 'from') > -1 ? 'empty' : ''}
							type="number"
							id="from"
							value={from}
							step={typeOfNumber === 'real' ? 'any' : '1'}
							onChange={(e) => setFrom(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="to">To</label>
						<input
							className={errors.findIndex((error) => error.element === 'to') > -1 ? 'empty' : ''}
							type="number"
							id="to"
							value={to}
							step={typeOfNumber === 'real' ? 'any' : '1'}
							onChange={(e) => setTo(e.target.value)}
						/>
					</div>
				</div>
			</fieldset>
			{/* Case Color */}
			<fieldset className={`${type === 'color' ? '' : ' hidden'}`}>
				<div className="cards">
					<input
						type="radio"
						id="rgb"
						value="rgb"
						checked={typeOfColor === 'rgb'}
						onChange={() => setTypeOfColor('rgb')}
					/>
					<label className="card" htmlFor="rgb">
						R G B
					</label>
					<input
						type="radio"
						id="hex"
						value="hex"
						checked={typeOfColor === 'hex'}
						onChange={() => setTypeOfColor('hex')}
					/>
					<label className="card" htmlFor="hex">
						Hexadecimal
					</label>
				</div>
			</fieldset>
			{/* Case Custom Item */}
			<fieldset className={`big${type === 'custom-item' ? '' : ' hidden'}`}>
				<div
					className={`card${errors.findIndex((error) => error.card === 'list-card') > -1 ? ' empty' : ''}`}
					id="list-card"
				>
					<label htmlFor="list">List of Items</label>
					<textarea
						className={`
							flex${errors.findIndex((error) => error.element === 'list') > -1 ? ' empty' : ''}`}
						id="list"
						value={list.join(',')}
						onChange={(e) => setList(e.target.value.split(','))}
						placeholder={`Separe items with a comma`}
					></textarea>
				</div>
			</fieldset>
			<fieldset className={`btn-container${showButton ? '' : ' hidden'}`}>
				{showButton && (
					<button className="card" type="submit">{`Get random ${capitalize(type)}${
						oneOrMany === 'many' ? 's' : ''
					}`}</button>
				)}
			</fieldset>
			<fieldset className={`result-container${result.length > 0 ? '' : ' hidden'}`}>
				<div>
					{result.map((item, index) => (
						<div key={index}>
							{item}
							{type === 'color' && <span className="color" style={{ backgroundColor: item }}></span>}
						</div>
					))}
				</div>
			</fieldset>
		</form>
	)
}
