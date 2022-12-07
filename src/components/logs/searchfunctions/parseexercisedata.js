export const getExerciseDataFromSearchResults = (results) => {
  if (results.length > 0) {
    const summarizedList = results.map((exercise) => {
      const { name, duration_min, nf_calories, user_input } = exercise;
      return {
        title: name,
        quantity: duration_min,
        calories: nf_calories,
        userInput: user_input,
      };
    });
    return summarizedList;
  } else {
    return;
  }
};
