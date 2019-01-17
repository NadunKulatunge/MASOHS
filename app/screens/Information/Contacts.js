import React, { Component } from 'react';
import { Container,  Content, List,  Text, Button } from 'native-base';
import { Font, AppLoading } from "expo";
import ListContact from '../../components/ListContact';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase';

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.fetchedDataRef = firebase.database().ref('contacts');
    this.state = { loading: true,fire_loaded1: false, fire_loaded2: false };
  }
  fetchedDatas= [];
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    firebase.database().ref('contacts/').orderByChild('contactName').on('value', (snapshot) => {
      this.fetchedDatas = [];
      snapshot.forEach((child)=>{
          this.fetchedDatas.push({
                    fetchedDataName: child.val().contactName,
                    fetchedDataNum: child.val().contactNum,
                    _key: child.key
                  });
         
      }) 
      this.setState({fire_loaded1:true});
      this.forceUpdate();
    });
    this.setState({ loading: false });
    await firebase.database().ref('users/'+firebase.auth().currentUser.uid).once('value',(snapshot) => {
      this.userRole = snapshot.val().role;
      this.userId = firebase.auth().currentUser.uid;
      this.setState({fire_loaded2:true});
      // this.forceUpdate();
    });
  }
  // listenForContacts(contactRef) {
  //   contactRef.on('value', (dataSnapshot) => {
  //     var contacts = [];
  //     dataSnapshot.forEach((child) => {
  //       contacts.push({
  //         contactName: child.val().contactName,
  //         contactNum: child.val().contactNum,
  //         _key: child.key
  //       });
  //     });
  //     this.setState({
  //       contacts:contacts,
  //     });
  //     this.forceUpdate();
  //   });
    
  //   }

  render() {
    if (this.state.loading) {
      return (
          <AppLoading />
      );
    }

    return (
      <Container>
        {this.state.fire_loaded1 && this.state.fire_loaded2 ?
        <Content>
          {console.log(this.fetchedDatas)} 
          {/* {console.log(this.userId)} */}
          <List dataArray={this.fetchedDatas}
            renderRow={(fetchedData) => this._renderItem(fetchedData)} >
          </List>                
        </Content>
        :
        <Content>
        <Text>Loading information. If this is taking too long please check your internet connection</Text>
        </Content>
        }
        {this.userRole == 'admin' || this.userRole == 'superadmin' ?
          <Button style={{ margin: 10 }}
                                full
                                rounded
                                success
                                onPress = { () => this.props.navigation.navigate('AddContact')}>
                                <Text style={{ color:'white' }}>Add Contact</Text>
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
            alert("The contact '"+fetchedData.fetchedDataName+"' has been removed successfully");
        },
        function() {
          // fulfillment
          alert("The contact '"+fetchedData.fetchedDataName+"' has not been removed successfully");
      });
      }
    
    return (
      // sending data to ListContact component
      <ListContact contact={fetchedData} onDataDeletion={onDataDeletion} userRole={this.userRole} />
      
    );
    
  }
}
export default withNavigation(Contacts);