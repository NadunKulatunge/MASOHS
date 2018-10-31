import React, { Component } from "react";
import {StyleSheet, Dimensions}  from "react-native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import RightHeaderButtons from '../../components/RightHeaderButtons.js';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Root, View, Spinner,Header, Form, Input, Item, Button, Label, Icon } from 'native-base';
import Leaderboard from 'react-native-leaderboard';
//...
import { Font, AppLoading } from "expo";
import firebase from 'firebase';
/*function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};*/


class ProWalker extends Component{
    static navigationOptions = ({navigation}) => ({
        title: 'Walking Pro',
        headerRight: (
            <RightHeaderButtons navigation={navigation}/>
        ),
    });
    constructor(props) {
        super(props)
        this.state = { loading: true, fire_loaded: false };
        
    }
    pdata=[]
    
    async componentWillMount() {
        await Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        //this.setState({ loading: false });
        firebase.database().ref('stepCount/').orderByChild("score").once('value', (snapshot) => {
            snapshot.forEach((item)=>{
               this.pdata.push(item.val());
               //this.forceUpdate();
            }) 
            //this.forceUpdate();
            this.setState({fire_loaded:true,});
            
      
          });
          //this.forceUpdate();
          this.setState({ loading: false });
          //this.forceUpdate();
    }
    
    /*state = {
        data: [
        { name: 'We Tu Lo', score: 300, iconUrl: 'https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094043-stock-illustration-profile-icon-male-avatar.jpg' },
        { name: 'Adam Savage', score: 12, iconUrl: 'https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png' },
        { name: 'Derek Black', score: 244, iconUrl: 'http://ttsbilisim.com/wp-content/uploads/2014/09/20120807.png' },
        { name: 'Erika White', score: 0, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-eskimo-girl.png' },
        { name: 'Jimmy John', score: 20, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
        { name: 'Joe Roddy', score: 69, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-braindead-zombie.png' },
        { name: 'Ericka Johannesburg', score: 101, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPis8NLdplTV1AJx40z-KS8zdgaSPaCfNINLtQ-ENdPvrtMWz' },
        { name: 'Tim Thomas', score: 41, iconUrl: 'http://conserveindia.org/wp-content/uploads/2017/07/teamMember4.png' },
        { name: 'John Davis', score: 80, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-afro-guy.png' },
        { name: 'Tina Turner', score: 22, iconUrl: 'https://cdn.dribbble.com/users/223408/screenshots/2134810/me-dribbble-size-001-001_1x.png' },
        { name: 'Harry Reynolds', score: 80, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsSlzi6GEickw2Ft62IdJTfXWsDFrOIbwXhzddXXt4FvsbNGhp' },
        { name: 'Betty Davis', score: 25, iconUrl: 'https://landofblogging.files.wordpress.com/2014/01/bitstripavatarprofilepic.jpeg?w=300&h=300' },
        { name: 'Lauren Leonard', score: 30, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr27ZFBaclzKcxg2FgJh6xi3Z5-9vP_U1DPcB149bYXxlPKqv-' },
    ]
    }*/

   
    
    
    render() {
        if (this.state.loading) {
            return (
                <AppLoading />
            );
          }
        const props = {
            labelBy: 'name',
            sortBy: 'score',
            data: this.pdata,
                       /*onRowPress: (item, index) => {
                this._alert(item.name + " clicked",
                    item.score + " points, wow!")
            },*/
            evenRowColor: '#edfcf9',
        }
        if(this.pdata.length==0){
            return (
                <View>
                {/* Ghetto Header */}
                <View style={{ paddingTop: 50, backgroundColor: '#FF0DDA', alignItems: 'center' }}>
                    <Text style={{ fontSize: 50, color: 'white', paddingBottom: 50 }}>
                        Leaderboard
                        {console.log(props.data)}
                    </Text>
                </View>
                
            
                
            </View>
            
            
            );
            
        
        }
        else{
            return (
                <View>
                {/* Ghetto Header */}
                <View style={{ paddingTop: 50, backgroundColor: '#FF0DDA', alignItems: 'center' }}>
                    <Text style={{ fontSize: 50, color: 'white', paddingBottom: 50 }}>
                        Leaderboard
                        {console.log(props.data)}
                    </Text>
                </View>
                <Leaderboard {...props} />
           
                
                </View>
            );
        }
    }
}

export default ProWalker;