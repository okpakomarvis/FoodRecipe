import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTER } from '../actions/meal';

const initialize = {
	meals: MEALS,
	mealsFilter: MEALS,
	favorite: []
};

const mealReducer = (state = initialize, action) => {
	switch (action.type) {
		case TOGGLE_FAVORITE:
			const exisitingIndex = state.favorite.findIndex((meal) => meal.id === action.mealId);
			if (exisitingIndex >= 0) {
				const updateFav = [ ...state.favorite ];
				updateFav.splice(exisitingIndex, 1);
				return {
					...state,
					favorite: updateFav
				};
			}
			else {
				const meal = state.meals.find((meal) => meal.id === action.mealId);
				return {
					...state,
					favorite: state.favorite.concat(meal)
				};
			}
		case SET_FILTER:
			const appliedFilter = action.filter;
			const filterMeal = state.meals.filter((meal) => {
				if (appliedFilter.gluten && !meal.isglutenFree) {
					return false;
				}
				if (appliedFilter.vegan && !meal.isVegan) {
					return false;
				}
				if (appliedFilter.vegetaran && !meal.isVegetarian) {
					return false;
				}
				if (appliedFilter.lastose && !meal.islactoseFree) {
					return false;
				}
				return true;
			});
			return {
				...state,
				mealsFilter: filterMeal
			};
		default:
			return state;
	}
};

export default mealReducer;
