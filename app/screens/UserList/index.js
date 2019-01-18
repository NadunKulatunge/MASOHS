import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator,TouchableOpacity } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import firebase from 'firebase';
import RightHeaderButtons from '../../components/RightHeaderButtons.js';
import { Container, Content} from 'native-base';

class UserList extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Users',
        headerRight: (
            <RightHeaderButtons navigation={navigation}/>
        ),
    });

  

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
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
                this.fire_items.push(item.val());
              }) 
              //console.log(this.fire_items)  Returns the users from database
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
          if(item.val().department == department){
            this.fire_items.push(item.val());
          }
      }) 
        //console.log(this.fire_items) Returns the users from database from the specified department
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

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        containerStyle={{
            backgroundColor:'transparent',
            borderTopWidth: 0,
            borderBottomWidth: 0,
          }}
      />
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <Container>
        <Content>
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: 'white', marginTop: -1 }}>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('UserProfile',{item})}>
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
              ListHeaderComponent={this.renderHeader}
            />
          </List>
          </Content>
          </Container>
    );
  }
}

export default UserList;