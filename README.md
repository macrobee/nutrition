# Nutrition Tracker

This is the nutrition tracker I made while learning React Hooks and React Context.

## Technology used

- languages: HTML, CSS, Javascript
- JS framework: React
- state management: React Context
- styling: Styled Components
- data source: Nutritionix API
- graphs: Nivo visualization library

## Purpose of the project

I created this project to help me track my food intake during the summer of 2022 when I was cycling 200-300km per week and couldn't tell if I was eating enough to sustain my level of activity. I found that other tracking apps were hard to use consistently as they required me to specify the amount/weight of every food item I ate, which became tedious over time.

### This app:
- allow users to easily track their daily macronutrient and caloric intake
- allows users to easily input their daily exercise and caloric expenditure
- allow users to compare their calories in vs calories out for each day
- allow users to add, remove, and edit entries
- display daily nutritional intake totals and compare to recommended intake totals based on their age, height, and weight
- display weekly totals
- show trends in macronutrient intake to help users monitor their progress

## Features
- Create an entry to log food and exercise for each day
- Collapse or expand an entry to view the details logged in the entry
- Expanded entries will display the food and exercise items logged for that day
- Progress bars will also update to show the nutrient intake progress for that day.
- When no entry is expanded, the progress bars will default to showing the week's nutrient intake progress
- Add exercise or food intake entries by typing in what they did for exercise or ate as food. The Nutritionix API takes care of natural language processing so individual items don't need to be listed.
- Graphs will update to show the macronutrient intake for each entry
- Modify user profile to adjust recommended nutrient and caloric intake
- Edit or delete entries
