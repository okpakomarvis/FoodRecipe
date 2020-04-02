import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DefaultText from './DefaultText';

const ListDetail = (props) => {
	return (
		<View style={styles.list}>
			<DefaultText>{props.children}</DefaultText>
		</View>
	);
};

const styles = StyleSheet.create({
	list: {
		marginVertical: 10,
		marginHorizontal: 20,
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 10
	}
});
export default ListDetail;
