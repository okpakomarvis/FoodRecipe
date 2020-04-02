import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import { setFilter } from '../store/actions/meal';
import DefaultText from '../components/DefaultText';
import Color from '../constants/color';

const FilterSwitch = (props) => {
	return (
		<View style={styles.container}>
			<DefaultText>{props.label}</DefaultText>
			<Switch
				trackColor={{ true: Color.primary }}
				value={props.value}
				thumbColor={Platform.OS === 'android' ? Color.primary : ''}
				onValueChange={props.onChange}
			/>
		</View>
	);
};

const FilterScreen = (props) => {
	const { navigation } = props;

	const [ isGlutenfree, setGluterFree ] = useState(false);
	const [ isLastosefree, setLastoseFree ] = useState(false);
	const [ isVeganfree, setVeganFree ] = useState(false);
	const [ isVegetarian, setVegetarian ] = useState(false);
	const dispatch = useDispatch();
	const saveFilter = useCallback(
		() => {
			const savelist = {
				gluten: isGlutenfree,
				lastose: isLastosefree,
				vegan: isVeganfree,
				vegetaran: isVegetarian
			};
			dispatch(setFilter(savelist));
		},
		[ isGlutenfree, isLastosefree, isVeganfree, isVegetarian, dispatch ]
	);
	useEffect(
		() => {
			props.navigation.setParams({
				save: saveFilter
			});
		},
		[ saveFilter ]
	);
	return (
		<View style={styles.screen}>
			<DefaultText style={styles.title}>Available Filters / Restrictions</DefaultText>
			<FilterSwitch label='Gluten-Free' value={isGlutenfree} onChange={(newValue) => setGluterFree(newValue)} />
			<FilterSwitch label='Latose-Free' value={isLastosefree} onChange={(newValue) => setLastoseFree(newValue)} />
			<FilterSwitch label='Vegan-Free' value={isVeganfree} onChange={(newValue) => setVeganFree(newValue)} />
			<FilterSwitch label='Vegetarian' value={isVegetarian} onChange={(newValue) => setVegetarian(newValue)} />
		</View>
	);
};
FilterScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'Filter Meal',
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
		),
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item title='Save' iconName='ios-save' onPress={navData.navigation.getParam('save')} />
			</HeaderButtons>
		)
	};
};
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center'
	},
	title: {
		fontSize: 22,
		fontFamily: 'open-sans-bold',
		margin: 20,
		textAlign: 'center'
	},
	container: {
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		width: '80%',
		marginVertical: 15
	}
});

export default FilterScreen;
