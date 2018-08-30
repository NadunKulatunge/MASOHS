import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

class homeScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Button title="go back to login screen" onPress={() => this.props.navigation.goBack()} />
                <Button title="go back to login screen" onPress={() => this.props.navigation.popToTop()} />
            </View>
        );
    }
}
export default homeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});