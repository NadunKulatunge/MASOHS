import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Image
} from "react-native";
//import {Ionicons} from '@expo/vector-icons';
//import { Icon, Button, Badge } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
//import AwesomeButtonRed from 'react-native-really-awesome-button/src/themes/red';
//import AwesomeButtonC137 from 'react-native-really-awesome-button/src/themes/c137';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';

//Custom Components
import RightHeaderButtons from '../../components/RightHeaderButtons.js';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, Spinner } from 'native-base';
//Initialize firebase
import * as firebase from 'firebase';

class Competitions extends Component {

    static navigationOptions = ({navigation}) => ({
        title: 'Competitions',
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
            <Container style={styles.container}>
                <Image
                style={{
                    backgroundColor: '#fff',
                    flex: 1,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                }}

                source={require('../../assets/kisspng-award-competition-quiz.png')}
                />    
                
                <AwesomeButtonCartman style={{ marginTop:280 }} type="primary" size="large" onPress = { () => this.props.navigation.navigate('ProWalker')}>Walking Pro</AwesomeButtonCartman>
                <AwesomeButtonCartman style={{ marginTop:40 }} type="secondary" size="large">Rick's Primary Button</AwesomeButtonCartman>
                <AwesomeButtonCartman style={{ marginTop:40 }} type="primary" size="large">Rick's Primary Button</AwesomeButtonCartman>
                
            </Container> 
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems:'center',
        //justifyContent:'center',
        //flexWrap: 'wrap',
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
export default Competitions;
