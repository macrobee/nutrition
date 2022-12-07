import {
  exerciseEndpoint,
  fetchMethodAndHeaders,
} from "../../../apidata/apidata";

//returns array of exercises
export const getExerciseData = async (searchQuery) => {
  if (searchQuery) {
    try {
      const response = await fetch(exerciseEndpoint, {
        ...fetchMethodAndHeaders,
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await response.json();

      return data.exercises;
    } catch (e) {
      console.log(e);
      return;
    }
  }
};
