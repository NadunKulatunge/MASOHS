import React, { Component } from 'react';
import { Container,  Content, List,  Text, Button } from 'native-base';
import { Font, AppLoading } from "expo";
import ListContact from '../../components/ListContact';
import firebase from 'firebase';

export default class Contacts extends Component {
  constructor(props) {
    super(props);
    this.contactRef = firebase.database().ref('contacts');
    this.state = { loading: true,fire_loaded1: false, fire_loaded2: false };
  }
  contacts= [];
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    firebase.database().ref('contacts/').orderByChild('contactName').on('value', (snapshot) => {
      snapshot.forEach((child)=>{
          this.contacts.push({
                    contactName: child.val().contactName,
                    contactNum: child.val().contactNum,
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
          {console.log(this.userRole)} 
      
          <List dataArray={this.contacts}
            renderRow={(contact) => this._renderItem(contact)} >
          </List>                
        </Content>
        :
        <Content>
        <Text>Loading information. If this is taking too long please check your internet connection</Text>
        </Content>
        }
        {this.userRole == 'admin' ?
          <Button style={{ marginTop:40 }}
                                full
                                rounded
                                success
                                onPress = { () => this.props.navigation.navigate('AddContact')}>
                                <Text style={{ color:'white' }}>Add Contact</Text>
                            </Button>
                            :
                            <Content></Content>
        }
      </Container>
      
    );
  }
  _renderItem(contact) {
      const onContactDeletion= () => {
        this.contacts = [];
        this.contactRef.child(contact._key).remove().then(
          function() {
            // fulfillment
            alert("The contact '"+contact.contactName+"' has been removed successfully");
        },
        function() {
          // fulfillment
          alert("The contact '"+contact.contactName+"' has not been removed successfully");
      });
      }
    
    return (
      
      <ListContact contact={contact} onContactDeletion={onContactDeletion} userRole={this.userRole} />

    );
    
  }
}