import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MealList from '../components/MealList';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const FavouriteMeal = (props) => {
	const availableMeal = useSelector((state) => state.meals.favorite);
	const mealData = availableMeal.filter((list) => list.id === 'm1' || list.id === 'm2');
	let content = <MealList displayMeal={mealData} navigation={props.navigation} />;
	if (availableMeal.length === 0 || !availableMeal) {
		content = (
			<View style={styles.emptyScreen}>
				<Text>No favourite meals found. start adding some!</Text>
			</View>
		);
	}
	return content;
};
FavouriteMeal.navigationOptions = (navData) => {
	return {
		headerTitle: 'Your Favourite',
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Menu'
					iconName='ios-menu'
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		)
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
export default FavouriteMeal;
