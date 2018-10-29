import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { Permissions, Notifications } from 'expo';
import {Ionicons} from '@expo/vector-icons';
import { Icon, Button, Badge, Container } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

//Custom Components
import RightHeaderButtons from '../components/RightHeaderButtons.js';

//Initialize firebase
import * as firebase from 'firebase';

//Functions
import * as FirebasePushNotifications from "../utils/FirebasePushNotifications";

//Offline Notice
import OfflineNotice from '../components/OfflineNotice'

class HomeScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: 'MASOHS',
        headerRight: (
            <RightHeaderButtons navigation={navigation}/>
        ),
    });

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(!user || !user.emailVerified){ 
                this.props.navigation.navigate('Login') 
            } else {
                /*Create user with unique key of 'uid'*/
                var usersRef = firebase.database().ref("users");
                usersRef.child(user.uid).set({ 
                    displayName: user.displayName,
                    email: user.email,
                });
                this.registerForPushNotificationsAsync(user);
                //console.log(user);
            }
            //FirebasePushNotifications.funcSendPushNotification("ExponentPushToken[P2ENaNMqe10xjTSFTmgBtE]", 'Test', 'Test2')
            //FirebasePushNotifications.funcSendPushNotificationToAllUsersExceptCurrentUser(user, "Hey Everyone!!", "If you recieve this msg send me a Thumbs Up. Thank you. ~ Nadun")
            FirebasePushNotifications.funcSendPushNotificationToUserID(user,'I1RXGmEvE5eaHIMQvemaz2stML93','Test2','Test Body2');
              

        })
    }

    registerForPushNotificationsAsync = async (user) => {
        
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
            
          );
          
          let finalStatus = existingStatus;
        
          // only ask if permissions have not already been determined, because
          // iOS won't necessarily prompt the user a second time.
          if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
          }
          
          // Stop here if the user did not grant permissions
          if (finalStatus !== 'granted') {
            return;
          }
          
          // Get the token that uniquely identifies this device
          let token = await Notifications.getExpoPushTokenAsync();
          console.log(token)

          var updates = {}
          updates['/expoToken'] = token
          
              console.log(updates)
          
          firebase.database().ref('users').child(user.uid).update(updates)
          
          

    }
        
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
            <OfflineNotice />
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('IncidentReporting')} >
                        <View style={[styles.box, {backgroundColor: '#4FC3F7'}]}>
                            <Text style={{color: 'rgba(0,0,0,0.5)'}}><Ionicons name='ios-create' size={responsiveFontSize(9)}/></Text>
                            <Text style={styles.boxText}>Reporting</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Monitoring')} >
                        <View style={[styles.box, {backgroundColor: '#e57373'}]}>
                            <Text style={{color: 'rgba(0,0,0,0.5)'}}><Ionicons name='md-pulse' size={responsiveFontSize(9)}/></Text>
                            <Text style={styles.boxText}>Monitoring</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Announcements')} >
                        <View style={[styles.box, {backgroundColor: '#90A4AE'}]}>
                            <Text style={{color: 'rgba(0,0,0,0.5)'}}><Ionicons name='md-megaphone' size={responsiveFontSize(9)}/></Text>
                            <Text style={styles.boxText}>Announcements</Text>
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
                            <Text style={{color: 'rgba(0,0,0,0.5)'}}><Ionicons name='ios-chatbubbles' size={responsiveFontSize(9)}/></Text>
                            <Text style={styles.boxText}>Chat</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Tasks')} >
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