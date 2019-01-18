import React, { Component } from 'react';
import { TouchableOpacity, Alert,KeyboardAvoidingView } from 'react-native';
import { Picker, ListItem,Label,Container, Content, Text, Icon, Card, CardItem, Item, Body, Right, Button, Input, Form, Textarea, Left, Root } from 'native-base';
import { Font, AppLoading } from "expo";
import Fire from '../Chat/Fire';
import firebase from 'firebase';
import {FormStyle} from '../../styles/styles.js';
import RightHeaderButtons from '../../components/RightHeaderButtons.js';
import * as appConst from '../../constants/Constants.js';

export default class Complain extends Component{

    static navigationOptions = ({navigation}) => ({
        title: 'Add Health Data',
        headerRight: (
            <RightHeaderButtons navigation={navigation}/>
        )
      });

    constructor(props) {
        super(props);
        this.state = {
            isSubmited: false, 
            date:null,
            loading:true,
            bPresLow:null,
            bPresHigh:null,
            weight:null
        };
    }

    username=Fire.shared.displayName;
    

    async componentWillMount() {
        await Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({ loading: false });
    }

    addPressure = (bPresLow,bPresHigh) => {
        userid=Fire.shared.uid;
        date=new Date().getDate()+'/'+ (new Date().getMonth()+1) +'/'+new Date().getFullYear();
        if(this.state.bPresLow!=null && this.state.bPresHigh!=null){ 
            firebase.database().ref('health/pressure').push({
                userid,
                date,
                bPresLow,
                bPresHigh
            }).then((data)=>{
                //success
                console.log('success:', data)
                this.setState({isSubmited:true})
            }).catch((error)=>{
                //error
                console.log('error',error)
                Alert.alert('Connection failed. Please check your internet and try again.',)
            }).then((data)=>{
                //success
                console.log('success')
                this.setState({isSubmited:true})
            }).catch((error)=>{
                //error
                console.log('error',error)
                Alert.alert('Connection failed. Please check your internet and try again.',)
            })
        }
        else{
            Alert.alert(
                'Please press SUBMIT button after entering a value.'
            )        
            }
    
    };

    addWeight = (weight) => {
        userid=Fire.shared.uid;
        date=new Date().getDate()+'/'+ (new Date().getMonth()+1) +'/'+new Date().getFullYear();
        if(this.state.weight!=null){ 
            firebase.database().ref('health/weight').push({
                userid,
                date,
                weight
            }).then((data)=>{
                //success
                console.log('success:', data)
                this.setState({isSubmited:true})
            }).catch((error)=>{
                //error
                console.log('error',error)
                Alert.alert('Connection failed. Please check your internet and try again.',)
            }).then((data)=>{
                //success
                console.log('success')
                this.setState({isSubmited:true})
            }).catch((error)=>{
                //error
                console.log('error',error)
                Alert.alert('Connection failed. Please check your internet and try again.',)
            })
        }
        else{
            Alert.alert(
                'Please press SUBMIT button after entering a value.'
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
              {this.state.isSubmited ?
              <Card style={FormStyle.postCard}>
              <KeyboardAvoidingView behavior="padding">
                  <CardItem>
                      <Item>
                         <Text style = {{flex:1}}>Thank you. Your Data has been submitted</Text>
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
              </Card>
              :
              <Card style={FormStyle.postCard} >
              <KeyboardAvoidingView behavior="padding">
                    <CardItem>
                        <Label>Enter Weight (kg)</Label>
                    </CardItem>
                    <CardItem>
                     <Item>
                        <Input onChangeText={(weight) => this.setState({weight})} />
                      </Item>
                  </CardItem>
                <CardItem>
                    <Body>
                        <Button full rounded style = {{ backgroundColor: appConst.THEME_COLOUR }} onPress={() => this.addWeight( this.state.weight)}>
                        <Text>Upload Weight</Text>
                        </Button>
                    </Body>
                </CardItem>

                  <CardItem style={{marginTop: 30}}>
                        <Label>Enter Blood Pressure (mmHg) </Label>
                  </CardItem>
                  <CardItem>
                     <Item inlineLabel>
                        <Label>Low</Label>  
                        <Input onChangeText={(bPresLow) => this.setState({bPresLow})} />
                      </Item>
                  </CardItem>
                  <CardItem>
                     <Item inlineLabel>
                        <Label>High</Label>  
                        <Input onChangeText={(bPresHigh) => this.setState({bPresHigh})} />
                      </Item>
                  </CardItem>
                  <CardItem>
                    <Body>
                        <Button full rounded style = {{ backgroundColor: appConst.THEME_COLOUR }} onPress={() => this.addPressure( this.state.bPresLow,this.state.bPresHigh)}>
                        <Text>Upload Blood Pressure</Text>
                        </Button>
                    </Body>
                </CardItem>
              </KeyboardAvoidingView>
              </Card>
              }
            </Content>
          </Container>
        );
    }    
      
}


