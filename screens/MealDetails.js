import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import ListDetails from '../components/ListDetails';
import { toggleFavorite } from '../store/actions/meal';

const MealDetails = (props) => {
	const mealId = props.navigation.getParam('mealId');
	const availableMeal = useSelector((state) => state.meals.meals);
	const dispatch = useDispatch();
	const toggleDispatch = useCallback(
		() => {
			dispatch(toggleFavorite(mealId));
		},
		[ dispatch, mealId ]
	);
	useEffect(
		() => {
			props.navigation.setParams({ toggleFav: toggleDispatch });
		},
		[ toggleDispatch ]
	);
	const currentMealisFav = useSelector((state) => state.meals.favorite.some((meal) => meal.id === mealId));
	useEffect(
		() => {
			props.navigation.setParams({
				isFav: currentMealisFav
			});
		},
		[ currentMealisFav ]
	);
	const selectedMeal = availableMeal.find((meal) => meal.id === mealId);
	return (
		<ScrollView>
			<Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
			<View style={styles.details}>
				<DefaultText>{selectedMeal.duration}m</DefaultText>
				<DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
				<DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
			</View>
			<DefaultText style={styles.title}>ingredients</DefaultText>
			{selectedMeal.ingredients.map((ingredient) => <ListDetails key={ingredient}>{ingredient}</ListDetails>)}
			<DefaultText style={styles.title}>Steps</DefaultText>
			{selectedMeal.steps.map((step) => <ListDetails key={step}>{step}</ListDetails>)}
		</ScrollView>
	);
};
MealDetails.navigationOptions = (navigationData) => {
	const mealTitle = navigationData.navigation.getParam('mealTitle');
	const toggleFavourite = navigationData.navigation.getParam('toggleFav');
	const isFavorite = navigationData.navigation.getParam('isFav');
	return {
		headerTitle: mealTitle,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item title='Favourite' iconName={isFavorite ? 'ios-star' : 'ios-star-outline'} onPress={toggleFavourite} />
			</HeaderButtons>
		)
	};
};

const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: 200
	},
	details: {
		flexDirection: 'row',
		padding: 15,
		justifyContent: 'space-around'
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 22,
		textAlign: 'center'
	}
});

export default MealDetails;
