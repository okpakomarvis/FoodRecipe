import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';

const CategoryMeal = (props) => {
	const catId = props.navigation.getParam('categoryId');
	const availableMeal = useSelector((state) => state.meals.mealsFilter);
	const displayMeal = availableMeal.filter((meal) => meal.categoryIds.indexOf(catId) >= 0);
	let content = <MealList displayMeal={displayMeal} navigation={props.navigation} />;
	if (availableMeal.length === 0 || !availableMeal) {
		content = (
			<View style={styles.emptyScreen}>
				<Text>No meals found. Please check your filters settings!</Text>
			</View>
		);
	}
	return content;
};
CategoryMeal.navigationOptions = (navigationData) => {
	const catId = navigationData.navigation.getParam('categoryId');
	const selectedCat = CATEGORIES.find((cat) => cat.id === catId);
	return {
		headerTitle: selectedCat.title
	};
};
const styles = StyleSheet.create({
	emptyScreen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		fontFamily: 'open-sans'
	}
});
export default CategoryMeal;
