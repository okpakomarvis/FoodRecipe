import React from 'react';
import { Text, StyleSheet } from 'react-native';

const DefaultText = (props) => {
	return <Text style={{ ...styles.defaultStyle, ...props.style }}>{props.children}</Text>;
};

const styles = StyleSheet.create({
	defaultStyle: {
		fontFamily: 'open-sans'
	}
});

export default DefaultText;
