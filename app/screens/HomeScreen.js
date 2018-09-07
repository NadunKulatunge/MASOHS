import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import { Icon, Button, Badge } from 'native-base';

//Custom Components
import RightHeaderButtons from '../components/RightHeaderButtons.js';

//Initialize firebase
import * as firebase from 'firebase';

class HomeScreen extends Component {

    static navigationOptions = {
        title: 'MASSOHS',
        headerRight: (
            <RightHeaderButtons/> //From custom components
        ),
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(!user || !user.emailVerified){ this.props.navigation.navigate('Login') };
            console.log(user);
        })
    }
        
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('IncidentReporting')} >
                        <View style={[styles.box, {backgroundColor: '#4FC3F7'}]}>
                            <Text style={{color: 'rgba(0,0,0,0.5)'}}><Ionicons name='ios-create' size={50}/></Text>
                            <Text style={styles.boxText}>Incident Reporting</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
                        <View style={[styles.box, {backgroundColor: '#e57373'}]}>
                            <Text style={{color: 'rgba(0,0,0,0.5)'}}><Ionicons name='md-pulse' size={50}/></Text>
                            <Text style={styles.boxText}>Health Monitoring</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
                        <View style={[styles.box, {backgroundColor: '#90A4AE'}]}>
                            <Text style={{color: 'rgba(0,0,0,0.5)'}}><Ionicons name='md-watch' size={50}/></Text>
                            <Text style={styles.boxText}>Connect Device</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
                        <View style={[styles.box, {backgroundColor: '#AED581'}]}>
                            <Text style={{color: 'rgba(0,0,0,0.5)'}}><Ionicons name='md-bicycle' size={50}/></Text>
                            <Text style={styles.boxText}>Competitions</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
                        <View style={[styles.box, {backgroundColor: '#9575CD'}]}>
                            <Text style={{color: 'rgba(0,0,0,0.5)'}}><Ionicons name='ios-text' size={50}/></Text>
                            <Text style={styles.boxText}>Notifications</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
                        <View style={[styles.box, {backgroundColor: '#FFB74D'}]}>
                            <Text style={{color: 'rgba(0,0,0,0.5)'}}><Icon name='md-alert' style={{fontSize: 20, color: 'red'}}/><Ionicons name='md-filing' size={50}/></Text>
                            <Text style={styles.boxText}>My Tasks</Text>
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
        
        
    },
    boxText: {
        fontSize: 20,
        textAlign: 'center',
        
    }

});