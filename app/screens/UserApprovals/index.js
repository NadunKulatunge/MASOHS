import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator,TouchableOpacity, Image } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import firebase from 'firebase';
import RightHeaderButtons from '../../components/RightHeaderButtons.js';
import {Ionicons} from '@expo/vector-icons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, H3 } from 'native-base';

class UserApprovals extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'User Approvals',
        headerRight: (
            <RightHeaderButtons navigation={navigation}/>
        ),
    });

  

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
      error: null,
    };

    this.arrayholder = [];
    
  }

  componentDidMount() {
    firebase.database().ref('users/'+firebase.auth().currentUser.uid).once('value', (snapshot) => {
      this.userRole = snapshot.val().role;
      this.department = snapshot.val().department;
      if(this.userRole == "superadmin"){ //If super admin show all the users
        this.makeRemoteRequest();
      }else if(this.userRole == "admin"){ //If admin Show only the department users
        this.makeRemoteRequestWithDepartment(this.department);
      }
    });


  };


  fire_items=[];

  makeRemoteRequest = () => {
       firebase.database().ref('users/').on('value', (snapshot) => {
            snapshot.forEach((item)=>{
                if(item.val().notApproved == "True"){
                  this.fire_items.push(item.val());
                }
              }) 
              //console.log(this.fire_items)
              this.setState({
                data: this.fire_items,
              });
              this.arrayholder = this.fire_items;
              this.setState({fire_loaded:true});
              this.forceUpdate();
            });
        this.setState({ loading: false });
  };

  makeRemoteRequestWithDepartment = (department) => {
    firebase.database().ref('users/').on('value', (snapshot) => {
      snapshot.forEach((item)=>{
          if(item.val().department == department && item.val().notApproved == "True"){
            this.fire_items.push(item.val());
          }
      }) 
        //console.log(this.fire_items)
        this.setState({
          data: this.fire_items,
        });
        this.arrayholder = this.fire_items;
        this.setState({fire_loaded:true});
        this.forceUpdate();
      });
    this.setState({ loading: false });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    //console.log(this.arrayholder);
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.email.toUpperCase()} ${item.displayName.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    } else if (this.state.loading==false && this.state.fire_loaded==true && this.fire_items!=""){
      return (
        <Container>
          <Content>
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: 'white', marginTop: -1 }}>
              <FlatList
                data={this.state.data}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate('UserAcceptProfile',{item})}>
                      <ListItem
                      roundAvatar
                      title={`${item.displayName}`}
                      subtitle={item.email}
                      //avatar={{ uri: item.picture.thumbnail }}
                      containerStyle={{ borderBottomWidth: 0 }}
                      />
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.email}
                ItemSeparatorComponent={this.renderSeparator}
              />
            </List>
            </Content>
            </Container>
      );

    } else if (this.state.loading==false && this.state.fire_loaded==true && this.fire_items==""){
            
      return (
        <Container>
        <Content>
        <Card style={{flex: 0}}>
            <CardItem header bordered>

            <Left>
              <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
                <H3 note style={{ fontWeight: "bold" }}>Whoops!</H3>
              </Body>
            </Left>
            </CardItem>
            <CardItem>
            <Body >
                <Image source={require('../../assets/searchdetective.jpg')} style={{width: '100%', height: 300, flex: 1}}/>
                <Text style={{marginTop: 30, marginBottom: 30}}>
                  There aren't any accounts to be approved!
                </Text>
            </Body>
            </CardItem>
        </Card>
        </Content>
    </Container>
      );
    } else{
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
  }
}

export default UserApprovals;