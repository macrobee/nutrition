export const appIdAndKey = {
    "x-app-id": "46aa3aa0",
    "x-app-key": "c79da6755c00f546c40e0f962d18c874",
  };

export const exerciseEndpoint = "https://trackapi.nutritionix.com/v2/natural/exercise";

export const fetchMethodAndHeaders = {
  method: "POST",
  headers: {
    "content-type": "application/json",
    ...appIdAndKey,
  }
}

export const foodEndpoint = "https://trackapi.nutritionix.com/v2/search/instant?query=";

export const nutrientEndpoint = "https://trackapi.nutritionix.com/v2/natural/nutrients";