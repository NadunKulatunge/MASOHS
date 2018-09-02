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
import { Icon, Button } from 'native-base';

//Initialize firebase
import * as firebase from 'firebase';

class HomeScreen extends Component {

    static navigationOptions = {
        title: 'MASSOHS',
        headerRight: (
            <Button transparent >
              <Icon name='more' style={{paddingTop: 5,}}/>
            </Button>
        )
    }

    constructor(props) {
        super(props)

        this.state = ({
            //email: '',
            //password: ''
        })

        firebase.auth().onAuthStateChanged(user => {
            //user account available and verified user
            if(!user || !user.emailVerified){ this.props.navigation.navigate('Login') };

        })
        //this.signUpUser = this.signUpUser.bind(this);
        
    }

    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('IncidentReporting')} >
                        <View style={[styles.box, {backgroundColor: '#4FC3F7'}]}>
                            <Text><Ionicons name='ios-create' size={50}/></Text>
                            <Text style={styles.boxText}>Incident Reporting</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
                        <View style={[styles.box, {backgroundColor: '#e57373'}]}>
                            <Text><Ionicons name='md-pulse' size={50}/></Text>
                            <Text style={styles.boxText}>Health Monitoring</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
                        <View style={[styles.box, {backgroundColor: '#90A4AE'}]}>
                            <Text><Ionicons name='md-watch' size={50}/></Text>
                            <Text style={styles.boxText}>Connect Device</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
                        <View style={[styles.box, {backgroundColor: '#AED581'}]}>
                            <Text><Ionicons name='md-bicycle' size={50}/></Text>
                            <Text style={styles.boxText}>Competitions</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
                        <View style={[styles.box, {backgroundColor: '#9575CD'}]}>
                            <Text><Ionicons name='ios-text' size={50}/></Text>
                            <Text style={styles.boxText}>Notifications</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
                        <View style={[styles.box, {backgroundColor: '#FFB74D'}]}>
                            <Text><Ionicons name='md-filing' size={50}/></Text>
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