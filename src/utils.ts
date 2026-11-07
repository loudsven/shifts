export const formatDate = (date: Date): string => {
	let month = new Intl.DateTimeFormat("ru-RU", {
		month: "long",
	}).format(date)
	if (month === "март" || month === "август") {
		month = month.slice(0, -1) + "а"
	} else {
		month = month.slice(0, -1) + "я"
	}
	return date.getDate() + " " + month
}
