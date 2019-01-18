import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container,  Content, List,  Text, Button, Card, CardItem, Footer, Left, Body, View } from 'native-base';
import { Font, AppLoading } from "expo";
import ListTip from '../../components/ListTip';
import { withNavigation } from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import firebase from 'firebase';

class Tips extends Component {
  constructor(props) {
    super(props);
    this.fetchedDataRef = firebase.database().ref('tips');
    this.state = { loading: true,fire_loaded1: false, fire_loaded2: false };
  }
  fetchedDatas= [];
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    firebase.database().ref('tips/').orderByChild('tipName').on('value', (snapshot) => {
      this.fetchedDatas = [];
      snapshot.forEach((child)=>{
          this.fetchedDatas.push({
                    fetchedDataName: child.val().tipName,
                    fetchedDataDes: child.val().tipDes,
                    _key: child.key
                  });
         
      }) 
      this.setState({fire_loaded1:true});
      this.forceUpdate();
    });
    this.setState({ loading: false });
    await firebase.database().ref('users/'+firebase.auth().currentUser.uid).once('value',(snapshot) => {
      this.userRole = snapshot.val().role;
      this.setState({fire_loaded2:true});
      // this.forceUpdate();
    });
  }
  render() {
    if (this.state.loading) {
      return (
        <AppLoading />
      );
    }

    return (
      <Container>
            <Content>
            <Card style={{flex: 0}}>
                <CardItem header bordered>
                <Left>
                    <Ionicons name='md-bulb' size={responsiveFontSize(5)}/>
                    <Body>
                    <Text>Safety Tip #1</Text>
                    </Body>
                </Left>
                </CardItem>
                <CardItem>
                <Body >
                    <Image source={{uri: 'https://image.freepik.com/free-vector/happy-kids-back-to-school_53876-40283.jpg'}} style={{width: '100%', height: 200, flex: 1}}/>
                    <Text style={{marginTop: 20,}}>
                        Educate everyone in the workplace about the safety requirements and consider posting a list of workplace safety tips. A workplace safety training will help them reduce or eliminate injuries and illnesses from occurring in the workplace.
                    </Text>
                </Body>
                </CardItem>
                <CardItem footer bordered>
                <Left>
                    <Button transparent textStyle={{color: '#87838B'}}>
                    <Ionicons color='#87838B' name='ios-image-outline' size={responsiveFontSize(3)}/>
                    <Text style={{color:'#87838B'}}>Created by Rawpixel.com - Freepik.com</Text>
                    </Button>
                </Left>
                </CardItem>
            </Card>
            </Content>
        </Container>
      
    );
  }
  _renderItem(fetchedData) {
    const onDataDeletion= () => {
      this.fetchedDatas = [];
      this.fetchedDataRef.child(fetchedData._key).remove().then(
        function() {
          // fulfillment
          alert("The tip data '"+fetchedData.fetchedDataName+"' has been removed successfully");
      },
      function() {
        // fulfillment
        alert("The tip data '"+fetchedData.fetchedDataName+"' has not been removed successfully");
    });
    }
  
  return (
    // sending data to ListTip component
    <ListTip tip={fetchedData} onDataDeletion={onDataDeletion} userRole={this.userRole} />
    
  );
  
}
}
export default withNavigation(Tips);
  
  
