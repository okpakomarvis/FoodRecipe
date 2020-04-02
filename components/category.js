import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

const Category = (props) => {
	let TouchableCap = TouchableOpacity;
	if (Platform.OS === 'android' && Platform.Version >= 21) {
		TouchableCap = TouchableNativeFeedback;
	}
	return (
		<View style={styles.gridItems}>
			<TouchableCap style={{ flex: 1 }} onPress={props.onPress}>
				<View style={{ ...styles.container, backgroundColor: props.color }}>
					<Text style={styles.title} numberOfLines={2}>
						{props.title}
					</Text>
				</View>
			</TouchableCap>
		</View>
	);
};
const styles = StyleSheet.create({
	gridItems: {
		flex: 1,
		margin: 15,
		height: 150,
		borderRadius: 10,
		overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible',
		elevation: 5
	},
	container: {
		flex: 1,
		borderRadius: 10,
		shadowOpacity: 0.26,
		shadowColor: 'black',
		shadowOffset: { height: 2, width: 0 },
		shadowRadius: 10,
		padding: 15,
		justifyContent: 'flex-end',
		alignItems: 'flex-end'
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 22,
		textAlign: 'right'
	}
});

export default Category;
