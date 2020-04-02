import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import CategoryCard from '../components/category';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const CategoryScreen = (props) => {
	const renderCategory = (itemData) => {
		return (
			<CategoryCard
				title={itemData.item.title}
				color={itemData.item.color}
				onPress={() =>
					props.navigation.navigate({
						routeName: 'Categorymeal',
						params: {
							categoryId: itemData.item.id
						}
					})}
			/>
		);
	};
	return <FlatList data={CATEGORIES} renderItem={renderCategory} numColumns={2} />;
};
CategoryScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'Meal Category',
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
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	}
});

export default CategoryScreen;
