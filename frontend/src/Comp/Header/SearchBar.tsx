import React, { useState } from "react"
import categories from "../../Categories/categories"
import { useHistory } from "react-router-dom"

const SearchBar = () => {
	let [searchInput, setSearchInput] = useState<string>("")
	let [category, setCategory] = useState<string>("All")

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value)
	}

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCategory(e.target.value)
	}

	let history = useHistory()

	const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			console.log(searchInput)
			let queryString = `?searchTerm=${searchInput}&category=${category}`
			history.replace("")
			history.push(`searchResults${queryString}`, [
				searchInput,
				category,
			])
			setSearchInput("")
			setCategory("All")
		}
	}

	return (
		<div className="items-center flex-none hidden px-4 text-gray-800 bg-gray-100 border-2 sm:flex dark:border-dracula-foreground dark:bg-dracula-background dark:text-dracula-foreground justify-evenly rounded-2xl ">
			<input
				type="text"
				className="flex-none h-8 px-1 bg-gray-100 border-r-2 outline-none sm:w-12 md:w-24 lg:w-52 hover:bg-blue-100 dark:bg-dracula-background dark:border-dracula-foreground dark:hover:bg-dracula-comment"
				onChange={handleInputChange}
				onKeyUp={handleSubmit}
				name="searchInput"
				placeholder="Search"
				value={searchInput}
			/>
			<select
				name="selectVal"
				className="h-8 mx-1 text-center bg-gray-100 outline-none sm:w-6 md:w-12 lg:w-36 hover:bg-blue-100 dark:bg-dracula-background dark:hover:bg-dracula-comment"
				onChange={handleCategoryChange}
				value={category}
			>
				<option value="all">all</option>
				{categories.map(({ categoryName }) => (
					<option key={categoryName} value={categoryName}>
						{categoryName.toLowerCase()}
					</option>
				))}
			</select>
		</div>
	)
}

export default SearchBar
