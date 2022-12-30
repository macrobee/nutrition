export const getFoodNutritionDataFromSearchResults = (results) => {
  if (results.length > 0) {
    const summarizedList = results.map((result) => {
      const {
        food_name,
        serving_qty,
        serving_weight_grams,
        nf_calories,
        nf_cholesterol,
        nf_dietary_fiber,
        nf_potassium,
        nf_protein,
        nf_saturated_fat,
        nf_sodium,
        nf_sugars,
        nf_total_carbohydrate,
        nf_total_fat,
      } = result;
      return {
        title: food_name,
        quantity: serving_qty,
        weight: serving_weight_grams,
        calories: nf_calories,
        nutrition: {
          cholesterol: nf_cholesterol,
          fiber: nf_dietary_fiber,
          potassium: nf_potassium,
          protein: nf_protein,
          saturatedFat: nf_saturated_fat,
          sodium: nf_sodium,
          sugars: nf_sugars,
          carbohydrates: nf_total_carbohydrate,
          fat: nf_total_fat,
        },
      };
    });
    return summarizedList;
  } else {
    return;
  }
};
