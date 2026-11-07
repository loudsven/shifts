export type Shift = {
	date: Date
	isWork: boolean
}

export const generateShifts = (
	startDate: Date,
	endDayOfMonth = 24,
): Shift[] => {
	const shifts: Shift[] = []
	const startDayOfMonth = startDate.getDate()
	let endMonth = startDate.getMonth()
	let endDate
	if (startDayOfMonth > endDayOfMonth - 1) {
		endMonth = getNextMonth(endMonth)
		endDate = new Date(
			startDate.getFullYear(),
			startDate.getMonth() + 1,
			endDayOfMonth,
		)
	} else {
		endDate = new Date(
			startDate.getFullYear(),
			startDate.getMonth(),
			endDayOfMonth,
		)
	}
	let candidateDate = startDate
	let dayCounter = 1
	let isWork = true
	while (candidateDate <= endDate) {
		if (dayCounter < 3) {
			isWork = true
			dayCounter++
		} else {
			isWork = false
			if (dayCounter > 3) {
				dayCounter = 1
			} else {
				dayCounter++
			}
		}
		if (candidateDate.getDate() === 1 && candidateDate.getMonth() === 0) {
			isWork = false
		}
		if (candidateDate !== startDate || candidateDate.getDate() !== 24) {
			shifts.push({ date: candidateDate, isWork })
		}
		const nextDate = new Date(candidateDate)
		nextDate.setDate(nextDate.getDate() + 1)
		candidateDate = nextDate
	}

	console.log(shifts)

	return shifts
}

const getNextMonth = (currentMonth: number): number => {
	return currentMonth === 11 ? 0 : currentMonth + 1
}
