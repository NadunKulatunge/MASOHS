import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import { Picker, ListItem,Label,Container, Content, Text, Icon, Card, CardItem, Item, Body, Right, Button, Input, Form, Textarea, Left, Root } from 'native-base';
import { Font, AppLoading } from "expo";
import firebase from 'firebase';
import Fire from '../Chat/Fire';

export default class Complain extends Component{
    constructor(props) {
        super(props);
        this.state = {
            reciever:null,
            msg:null,
            location:null,
            isSubmited: false, 
            loading:true,
        };
    }

    onValueChangeReciever(value) {
        this.setState({
          reciever: value
        });
    }
    

    async componentWillMount() {
        await Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({ loading: false });
    }

    postMsg = (reciever, location, msg) => {
    username=Fire.shared.displayName
    if((this.state.msg!=null)&&(this.state.reciever!=null)){ 
        firebase.database().ref('accidents/').push({
            location,
            msg,
            reciever,
            username
        }).then((data)=>{
            //success
            console.log('data',data)
            this.setState({isSubmited:true})
        }).catch((error)=>{
            //error
            console.log('error',error)
            Alert.alert('Connection failed. Please check your internet and try again.',)
        })
    }
    else{
        Alert.alert(
            'Please press SUBMIT button after entering your Message.',
        )        
        }
    
    };

    _togglePostCard(){
        this.setState({isSubmited:false})
    }

    render() {
        if (this.state.loading) {
            return (
              <Root>
                <AppLoading />
              </Root>
            );
          
        }

        return (
          <Container>
            <Content>
              <Card style={styles.postCard}>
              {this.state.isSubmited ?
              <KeyboardAvoidingView behavior="padding">
                  <CardItem>
                      <Item>
                         <Text style = {{flex:1}}>Thank you. You will be informed of further action.</Text>
                      </Item>
                  </CardItem>
                  <CardItem>
                      <Left>
                      </Left>
                      <Body>
                          <TouchableOpacity success onPress={() => this._togglePostCard()}>
                              <Icon active name="refresh" style={{fontSize: 40, color: '#64DD17', marginLeft:10}} />
                          </TouchableOpacity>
                      </Body>
                      <Right>
                      </Right>
                  </CardItem>
              </KeyboardAvoidingView>
              :
              <KeyboardAvoidingView behavior="padding">
                  
                    
                  <CardItem>
                    <Item Picker>
                    <Label>Reciever</Label>  
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                        selectedValue={this.state.reciever}
                        onValueChange={this.onValueChangeReciever.bind(this)}
                    >
                        <Picker.Item label="Select reciever" value="null" />
                        <Picker.Item label="Chamin" value="Chamin" />
                        <Picker.Item label="Nadun" value="Nadun" />
                    </Picker>
                    </Item>
                  </CardItem>
                  


                  <CardItem>
                      <Item stackedLabel>
                        <Label>Accident Location</Label>  
                        <Input onChangeText={(location) => this.setState({location})}/>
                      </Item>
                  </CardItem>

                  <ListItem itemHeader first>
                    <Text>Please describe the accident</Text>
                  </ListItem>
                
                      <Form style = {{ marginLeft: 20, marginRight:20 }}>
                          <Textarea rowSpan={5} bordered onChangeText={(msg) => this.setState({msg})}/>
                      </Form>
                  <CardItem>
                      
                      <Left>
                      </Left>
                      <Body>
                          <Button full rounded success onPress={() => this.postMsg(this.state.reciever, this.state.location, this.state.msg)}>
                          <Text>Submit</Text>
                          </Button>
                      </Body>
                      <Right>
                      </Right>
                  </CardItem>
              </KeyboardAvoidingView>
              }
              </Card>
            </Content>
          </Container>
        ); 
    }    
      
}

const styles = StyleSheet.create({
    loading:{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    alertBox: {
      backgroundColor: '#1C97F7',
    },
    alertText: {
      fontSize:12,
      color: '#ffffff',
    },
    conCard: {
      marginLeft: 25,
      marginRight: 25,
      marginTop: 20,
    },
    conCardItem: {
      marginLeft: 5,
      marginTop:5,
    },
    conDetails: {
      fontSize: 15,
      color: 'black',
      marginLeft: 5,
    },
    postCard: {
      marginLeft: 25,
      marginRight: 25,
      marginTop: 20,
      marginBottom: 20,     
    }
  });