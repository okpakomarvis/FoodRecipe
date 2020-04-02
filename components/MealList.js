import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, FlatList } from 'react-native';
import MealItems from './MealItems';

const MealList = (props) => {
	const currentMealisFav = useSelector((state) => state.meals.favorite);
	const renderMeal = (itemData) => {
		return (
			<MealItems
				title={itemData.item.title}
				duration={itemData.item.duration}
				complexity={itemData.item.complexity}
				affordability={itemData.item.affordability}
				image={itemData.item.imageUrl}
				onPress={() =>
					props.navigation.navigate({
						routeName: 'Categorydetail',
						params: {
							mealId: itemData.item.id,
							mealTitle: itemData.item.title
						}
					})}
			/>
		);
	};
	return (
		<View style={styles.screen}>
			<FlatList data={props.displayMeal} renderItem={renderMeal} style={{ width: '100%' }} />
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default MealList;
