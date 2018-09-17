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
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

//Custom Components
import RightHeaderButtons from '../components/RightHeaderButtons.js';

//Initialize firebase
import * as firebase from 'firebase';

class HomeScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: 'MASOHS',
        headerRight: (
            <RightHeaderButtons navigation={navigation}/>
        ),
    });

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(!user || !user.emailVerified){ this.props.navigation.navigate('Login') };
            //console.log(user);
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
                            <Text style={{color: 'rgba(0,0,0,0.5)'}}><Ionicons name='ios-create' size={responsiveFontSize(9)}/></Text>
                            <Text style={styles.boxText}>Reporting</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
                        <View style={[styles.box, {backgroundColor: '#e57373'}]}>
                            <Text style={{color: 'rgba(0,0,0,0.5)'}}><Ionicons name='md-pulse' size={responsiveFontSize(9)}/></Text>
                            <Text style={styles.boxText}>Monitoring</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')} >
                        <View style={[styles.box, {backgroundColor: '#90A4AE'}]}>
                            <Text style={{color: 'rgba(0,0,0,0.5)'}}><Ionicons name='md-watch' size={responsiveFontSize(9)}/></Text>
                            <Text style={styles.boxText}>Devices</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')} >
                        <View style={[styles.box, {backgroundColor: '#AED581'}]}>
                            <Text style={{color: 'rgba(0,0,0,0.5)'}}><Ionicons name='md-bicycle' size={responsiveFontSize(9)}/></Text>
                            <Text style={styles.boxText}>Competitions</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat')} >
                        <View style={[styles.box, {backgroundColor: '#9575CD'}]}>
                            <Text style={{color: 'rgba(0,0,0,0.5)'}}><Ionicons name='ios-text' size={responsiveFontSize(9)}/></Text>
                            <Text style={styles.boxText}>Chat</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
                        <View style={[styles.box, {backgroundColor: '#FFB74D'}]}>
                            <Text style={{color: 'rgba(0,0,0,0.5)'}}><Ionicons name='md-filing' size={responsiveFontSize(9)}/></Text>
                            <Text style={styles.boxText}>Tasks<Icon name='md-alert' style={{fontSize: 20, color: 'red'}}/></Text>
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
        width : responsiveWidth(50) - 7,
        justifyContent: 'center',
        alignItems: 'center',
        
        
    },
    boxText: {
        fontSize: responsiveFontSize(2),
        textAlign: 'center',
        fontWeight: "600",
        color: 'rgba(0,0,0,0.5)',
        
    }

});