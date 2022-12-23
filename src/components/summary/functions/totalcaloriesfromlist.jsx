export const sumCaloriesFromList = (list) => {
  const totalCalories = list
    .map((item) => item.calories)
    .reduce((acc, cur) => acc + cur, 0);
  return totalCalories;
};
