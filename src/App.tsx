import React, { useState } from "react"
import "./App.css"
import { generateShifts, type Shift } from "./generate-shifts"
import { formatDate } from "./utils"

function App() {
	const [shifts, setShifts] = useState<Shift[]>([])
	const submitHandle = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
		const value = formData.get("start-date")

		if (typeof value !== "string" || !value) return

		const startDate = new Date(`${value}T00:00:00`)

		setShifts(generateShifts(startDate))
	}

	const [dailyRate, setDailyRate] = useState(0)
	const [isValid, setIsValid] = useState(false)

	const dateChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsValid(e.target.validity.valid)
		setShifts([])
	}

	return (
		<>
			<section id="center">
				<form onSubmit={submitHandle}>
					<input
						required
						type="date"
						name="start-date"
						id="start-date-input"
						onChange={(e) => dateChangeHandle(e)}
					/>
					<button disabled={!isValid} type="submit" id="generate-shifts-button">
						generate
					</button>
				</form>
				<label className="daily-rate-label">
					<span>daily rate</span>
					<input
						type="number"
						name="dailyRate"
						value={dailyRate}
						onChange={(e) => setDailyRate(Number(e.target.value))}
					/>
				</label>

				<p>Work days: {shifts.filter((shift) => shift.isWork).length}</p>
				<p>
					Salary: {shifts.filter((shift) => shift.isWork).length * dailyRate}₽
				</p>
				<ol style={{ columnCount: 2 }}>
					{shifts.map((shift) => {
						const classNames = shift.isWork ? "green" : "red"

						const formatedDate = formatDate(shift.date)
						return (
							<li style={{ marginRight: "1.3rem" }} key={String(shift.date)}>
								<span className={classNames}>{formatedDate}</span>
							</li>
						)
					})}
				</ol>
			</section>
		</>
	)
}

export default App
