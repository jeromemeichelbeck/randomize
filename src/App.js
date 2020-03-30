import React from 'react'

import { Header } from './components/header/Header'
import { Footer } from './components/footer/Footer'
import { Form } from './components/form/Form'

import './app.scss'

function App() {
	return (
		<div className="app">
			<Header />
			<main className="container">
				<Form />
			</main>
			{/* <Result /> */}
			<Footer />
		</div>
	)
}

export default App
