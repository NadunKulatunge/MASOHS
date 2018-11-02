/**
 * Icons displayed in the right side of the header
 * How to use:
 * 
 * import RightHeaderButtons from '../components/RightHeaderButtons.js';
 * 
 * static navigationOptions = ({navigation}) => ({
        title: 'Page_name_goes_here',
        headerRight: (
            <RightHeaderButtons navigation={navigation}/>
        ),
    });

    <Button transparent onPress = { () => firebase.auth().signOut()}>
        <Text style={{marginHorizontal:9    12}}><Icon name='md-alert' style={{fontSize: 15, color: 'red'}}/><Icon name='md-person' style={{color: 'white'}}/></Text>
    </Button>
 */
import React, { Component } from "react";
import { 
    View,
    Text
} from "react-native";
import { Button, Icon } from "native-base";

//Initialize firebase
import * as firebase from 'firebase';

class RightHeaderButton extends Component {
    render() {
        return (
            <View style={{flexDirection: 'row'}}>
            <Button transparent onPress = { () => this.props.navigation.navigate('Notifications')}>
                <Text style={{marginHorizontal:10}}><Icon name='md-alert' style={{fontSize: 15, color: 'red'}}/><Icon name='md-notifications' style={{color: 'white'}}/></Text>
            </Button>
            <Button transparent onPress = { () => this.props.navigation.navigate('Settings')}>
                <Text style={{marginHorizontal:10, marginRight:15}}><Icon name='md-settings' style={{color: 'white'}}/></Text>
            </Button>
            </View>
        );
    }
}
export default RightHeaderButton;
