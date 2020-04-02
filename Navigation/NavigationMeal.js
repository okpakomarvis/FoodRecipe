import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform, Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import CategoryScreen from '../screens/CategoryScreen';
import CategoryMealScreen from '../screens/CategoryMeal';
import CategoryDetailMeal from '../screens/MealDetails';
import FilterScreen from '../screens/filterScreen';
import Color from '../constants/color';
import FavouriteScreen from '../screens/FovouriteMeal';
import { Ionicons } from '@expo/vector-icons';

const defaultNavIotion = {
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: Platform.OS === 'android' ? Color.primary : ''
		},
		headerTitleStyle: {
			fontFamily: 'open-sans-bold'
		},
		headerBackTitleStyle: {
			fontFamily: 'open-sans'
		},
		headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary
	}
};

const MealNavigation = createStackNavigator(
	{
		Category: CategoryScreen,
		Categorymeal: {
			screen: CategoryMealScreen
		},
		Categorydetail: CategoryDetailMeal
	},
	defaultNavIotion
);

const FavouriteNav = createStackNavigator(
	{
		favourite: FavouriteScreen,
		mealDetail: CategoryDetailMeal
	},
	defaultNavIotion
);

const Tabnavigator = {
	meals: {
		screen: MealNavigation,
		navigationOptions: {
			tabBarIcon: (tabinfo) => {
				return <Ionicons name='ios-restaurant' size={25} color={tabinfo.tintColor} />;
			},
			tabBarColor: Color.primary,
			tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }}>Meals!</Text> : 'Meals'
		}
	},
	Favourite: {
		screen: FavouriteNav,
		navigationOptions: {
			tabBarLabel: 'Favourite!',
			tabBarIcon: (tabinfo) => {
				return <Ionicons name='ios-star' size={25} color={tabinfo.tintColor} />;
			},
			tabBarColor: Color.accentCol,
			tabBarLabel:
				Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }}>Favourite!</Text> : 'Favourite!'
		}
	}
};
const filterNavigator = createStackNavigator(
	{
		filters: FilterScreen
	},
	defaultNavIotion
);
const MealStackNavigation =
	Platform.OS === 'android'
		? createMaterialBottomTabNavigator(Tabnavigator, {
				activeTintColor: 'white',
				shifting: true
			})
		: createBottomTabNavigator(Tabnavigator, {
				tabBarOptions: {
					activeTintColor: Color.accentCol,
					labelStyle: {
						fontFamily: 'open-sans-bold'
					}
				}
			});
const MainNavigatorDrawer = createDrawerNavigator(
	{
		mealFav: { screen: MealStackNavigation, navigationOptions: { drawerLabel: 'Meal' } },
		Filters: filterNavigator
	},
	{
		contentOptions: {
			activeTintColor: Color.accentCol,
			labelStyle: {
				fontFamily: 'open-sans-bold'
			}
		}
	}
);
export default createAppContainer(MainNavigatorDrawer);
