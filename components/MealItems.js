import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
	ImageBackground
} from 'react-native';
import DefaultText from './DefaultText';

const MealItems = (props) => {
	let TouchableCap = TouchableOpacity;
	if (Platform.OS === 'android' && Platform.Version >= 21) {
		TouchableCap = TouchableNativeFeedback;
	}
	return (
		<View style={styles.MealItem}>
			<TouchableCap onPress={props.onPress}>
				<View>
					<View style={{ ...styles.MealRow, ...styles.Mealhead }}>
						<ImageBackground source={{ uri: props.image }} style={styles.bgimage}>
							<View style={styles.titlecontainer}>
								<Text style={styles.title} numberOfLines={1}>
									{props.title}
								</Text>
							</View>
						</ImageBackground>
					</View>
					<View style={{ ...styles.MealRow, ...styles.MealDetails }}>
						<DefaultText>{props.duration}m</DefaultText>
						<DefaultText>{props.complexity.toUpperCase()}</DefaultText>
						<DefaultText>{props.affordability.toUpperCase()}</DefaultText>
					</View>
				</View>
			</TouchableCap>
		</View>
	);
};
const styles = StyleSheet.create({
	MealItem: {
		height: 200,
		width: '100%',
		backgroundColor: '#ccc',
		borderRadius: 20,
		overflow: 'hidden'
	},
	MealRow: {
		flexDirection: 'row'
	},
	Mealhead: {
		height: '85%'
	},
	MealDetails: {
		paddingHorizontal: 15,
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '15%'
	},
	bgimage: {
		width: '100%',
		height: '100%',
		justifyContent: 'flex-end'
	},
	titlecontainer: {
		paddingVertical: 5,
		paddingHorizontal: 15,
		backgroundColor: 'rgba(0,0,0,0.5)'
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 22,
		color: 'white',
		textAlign: 'center'
	}
});

export default MealItems;
