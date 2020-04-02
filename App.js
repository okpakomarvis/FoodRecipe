import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import MealNavigation from './Navigation/NavigationMeal';
import { enableScreens } from 'react-native-screens';
import Reducer from './store/reducers/meals';

const combine = combineReducers({
	meals: Reducer
});
const store = createStore(combine);

const fetchFont = () => {
	enableScreens();
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
	});
};

export default function App() {
	const [ fontLoaded, setFontloaded ] = useState(false);
	if (!fontLoaded) {
		return <AppLoading startAsync={fetchFont} onFinish={() => setFontloaded(true)} />;
	}
	return (
		<Provider store={store}>
			<MealNavigation />
		</Provider>
	);
}
