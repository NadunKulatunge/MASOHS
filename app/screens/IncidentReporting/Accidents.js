import React, { Component } from 'react';
import { TouchableOpacity, Alert,KeyboardAvoidingView } from 'react-native';
import { Picker, ListItem,Label,Container, Content, Text, Icon, Card, CardItem, Item, Body, Right, Button, Input, Form, Textarea, Left, Root } from 'native-base';
import { Font, AppLoading } from "expo";
import Fire from '../Chat/Fire';
import firebase from 'firebase';
import {FormStyle} from '../../styles/styles.js';


export default class Accident extends Component{
    constructor(props) {
        super(props);
        this.state = {
            reciever:null,
            msg:null,
            location:null,
            isSubmited: false, 
            date:null,
            loading:true,
            fire_loaded:false
        };
    }

    fire_items=[];

    async componentWillMount() {
        await Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        
        await firebase.database().ref('admin/').on('value', (snapshot) => {
            snapshot.forEach((item)=>{
                this.fire_items.push(item);
              }) 
              this.setState({fire_loaded:true});
              this.forceUpdate();
            });
        this.setState({ loading: false });
    }

    postMsg = ( reciever, location, msg) => {
    username=Fire.shared.displayName;
    userid=Fire.shared.uid;
    type="accidents";
    status='raised';
    date=new Date().getDate()+'/'+ (new Date().getMonth()+1) +'/'+new Date().getFullYear();
    if((this.state.msg!=null)&&(this.state.reciever!=null)){ 
        firebase.database().ref('accidents/').push({
            location,
            msg,
            reciever,
            username,
            userid,
            date,
            type,
            status
        }).then((data)=>{
            //success
            console.log('data',data)
            this.setState({isSubmited:true})
        }).catch((error)=>{
            //error
            console.log('error',error)
            Alert.alert('Error', 'Connection failed. Please check your internet and try again.')
        })
    }
    else{
        Alert.alert('Error','Please press SUBMIT button after entering your Message and selecting a reciever.')        
        }
    
    };
    
    onValueChangeReciever(value) {
        this.setState({
          reciever: value
        });
    }

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
        
        const pickerOptions = this.fire_items.map((item, index) => (
            <Picker.Item label={item.val().username} value={item.val().userid} key={index} />
            ));        
        

        return (
          <Container>
            <Content>
              <Card style={FormStyle.postCard}>
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
                        mode="dialog"
                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                        selectedValue={this.state.reciever}
                        onValueChange={this.onValueChangeReciever.bind(this)}
                    >
                        <Picker.Item label="Select a reciever" value="null" />
                        {pickerOptions}
                    </Picker>
                    </Item>
                  </CardItem>

                  <CardItem>
                      <Item stackedLabel>
                        <Label>Risk Location</Label>  
                        <Input onChangeText={(location) => this.setState({location})} />
                      </Item>
                  </CardItem>

                  <ListItem itemHeader first>
                    <Text>Please describe the risk</Text>
                  </ListItem>
                
                      <Form style = {{ marginLeft: 20, marginRight:20 }}>
                          <Textarea rowSpan={5} bordered onChangeText={(msg) => this.setState({msg})}/>
                      </Form>

                  <CardItem>
                      <Left>
                      </Left>
                      <Body>
                          <Button full rounded success onPress={() => this.postMsg( this.state.reciever, this.state.location, this.state.msg)}>
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

