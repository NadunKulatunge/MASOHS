import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container,  Content, List,  Text, Button, Card, CardItem, Footer, Left, Body } from 'native-base';
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
      //  <Container>
      //    <Card>
      //      <CardItem>
      //        <Body>
      //        <Image source={{uri: 'https://image.freepik.com/free-vector/happy-kids-back-to-school_53876-40283.jpg'}} style={{width: '100%', height: 200, flex: 1}}/>
      //        </Body>
      //      </CardItem>
      //    </Card>
         
      //  </Container>
      );
    }

    return (
      <Container>
      
        {this.state.fire_loaded1 && this.state.fire_loaded2 ?
        
        
        <Content>
          {/* {console.log(this.fetchedDatas)}  */}
          <Card style={{flex: 0}}>
          <CardItem>
              <Body >
                  <Image source={{uri: 'https://image.freepik.com/free-vector/happy-kids-back-to-school_53876-40283.jpg'}} style={{width: '100%', height: 200, flex: 1}}/>
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
          <Card dataArray={this.fetchedDatas}
            renderRow={(fetchedData) => this._renderItem(fetchedData)} >
          </Card>                
        </Content>
        :
        <Content>
        
        <Text>Loading information. If this is taking too long please check your internet connection</Text>
        </Content>
        }
        {this.userRole == 'admin' || this.userRole == 'superadmin' ?
          <Button style={{ marginTop:40 }}
                                full
                                rounded
                                success
                                onPress = { () => this.props.navigation.navigate('AddTip')}>
                                <Text style={{ color:'white' }}>Add Tip Data</Text>
                            </Button>
                            :
                            <Text></Text>
        }
    
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
  
  
