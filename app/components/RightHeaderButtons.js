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
            <Button transparent >
                <Text style={{marginHorizontal:9}}><Icon name='md-alert' style={{fontSize: 15, color: 'red'}}/><Icon name='notifications'/></Text>
            </Button>
            <Button transparent onPress = { () => firebase.auth().signOut()}>
                <Text style={{marginHorizontal:9}}><Icon name='md-alert' style={{fontSize: 15, color: 'red'}}/><Icon name='person'/></Text>
            </Button>
            <Button transparent onPress = { () => this.props.navigation.navigate('Settings')}>
                <Text style={{marginHorizontal:9, marginRight:12}}><Icon name='settings'/></Text>
            </Button>
            </View>
        );
    }
}
export default RightHeaderButton;
