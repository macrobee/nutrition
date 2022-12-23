export const EMPTY_NUTRITION_OBJECT = {
  carbohydrates: 0,
  cholesterol: 0,
  fat: 0,
  fiber: 0,
  potassium: 0,
  protein: 0,
  saturatedFat: 0,
  sodium: 0,
  sugars: 0,
};
export const summarizeNutritionalData = (foodItemList) => {
    const itemSummary = foodItemList.reduce(
        (acc, cur) => {
          let {
            carbohydrates,
            cholesterol,
            fat,
            fiber,
            potassium,
            protein,
            saturatedFat,
            sodium,
            sugars,
          } = cur;
          return {
            carbohydrates: carbohydrates + acc.carbohydrates,
            cholesterol: cholesterol + acc.cholesterol,
            fat: fat + acc.fat,
            fiber: fiber + acc.fiber,
            potassium: potassium + acc.potassium,
            protein: protein + acc.protein,
            saturatedFat: saturatedFat + acc.saturatedFat,
            sodium: sodium + acc.sodium,
            sugars: sugars + acc.sugars,
          };
        },
        EMPTY_NUTRITION_OBJECT
      );
      return itemSummary;
}