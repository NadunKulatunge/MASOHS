import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from "react-native";
import {Ionicons} from '@expo/vector-icons';

class HomeScreen extends Component {

    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
                        <View style={styles.box}>
                            <Text><Ionicons name='md-checkmark-circle' size={40}/></Text>
                            <Text>Incident Reporting</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
                        <View style={styles.box}>
                            <Text>Health Monitoring</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
                        <View style={styles.box}>
                            <Text>Connect Device</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
                        <View style={styles.box}>
                            <Text>Competitions</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
                        <View style={styles.box}>
                            <Text>Notifications</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
                        <View style={styles.box}>
                            <Text>My Tasks</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            
            </ScrollView>
        );
    }
}
export default HomeScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 2,
    },
    scrollContainer: {
        flex: 1,
    },
    box: {
        margin: 2,
        height: Dimensions.get('window').height/3 - 27,
        width : Dimensions.get('window').width/2 - 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        
    }

});