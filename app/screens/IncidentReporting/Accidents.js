import React, { Component } from 'react';
import { TouchableOpacity, Alert,KeyboardAvoidingView, View, StyleSheet, ActivityIndicator, } from 'react-native';
import { Picker, ListItem,Label,Container, Content, Text, Icon, Card, CardItem, Item, Body, Right, Button, Input, Form, Textarea, Left, Root } from 'native-base';
import { Font, AppLoading, ImagePicker, Permissions } from "expo";
import Fire from '../Chat/Fire';
import firebase from 'firebase';
import {FormStyle} from '../../styles/styles.js';
//Constants
import * as appConst from '../../constants/Constants';
import uuid from 'uuid';

//Functions
import * as FirebasePushNotifications from "../../utils/FirebasePushNotifications";

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
            fire_loaded:false,
            uploading: false,

        };
    }

    fire_items=[];

    async componentWillMount() {
        await Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        
        await firebase.database().ref('users').orderByChild('role').equalTo('admin').once('value', (snapshot) => {
            snapshot.forEach((item)=>{
                this.fire_items.push(item);
              }) 
              this.setState({fire_loaded:true});
              this.forceUpdate();
            });
        this.setState({ loading: false });
    }

    postMsg = ( reciever, location, msg ) => {
    username=Fire.shared.displayName;
    userid=Fire.shared.uid;
    type="accidents";
    status='raised';
    imageURL = Fire.shared.imageURL;
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
            status,
            imageURL
        }).then((data)=>{
            //success
            console.log('data',data)
            FirebasePushNotifications.funcSendPushNotificationToUserID(firebase.auth().currentUser,reciever,'Accident',username + ': ' + msg);
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

    askPermissions = async () => {
        await Expo.Permissions.askAsync(Permissions.CAMERA);
        await Expo.Permissions.askAsync(Permissions.CAMERA_ROLL)
    }

    _takePhoto = async () => {
        this.askPermissions();
        //console.log(status1);
        //console.log(status2);
            let pickerResult = await ImagePicker.launchCameraAsync({ //Expo launch camera
                allowsEditing: true,
                quality : appConst.IMAGE_UPLOAD_QUALITY,
            });
    
            this._handleImagePicked(pickerResult);
      
        
    };
    
    _pickImage = async () => {
        this.askPermissions();
        let pickerResult = await ImagePicker.launchImageLibraryAsync({ //Expo image picker library
          allowsEditing: true,
          quality : appConst.IMAGE_UPLOAD_QUALITY, 
        });
        
        this._handleImagePicked(pickerResult);
    };

    _handleImagePicked = async pickerResult => {
        try {
          this.setState({ uploading: true });
    
          if (!pickerResult.cancelled) {
            uploadUrl = await uploadImageAsync(pickerResult.uri);
            //this.setState({ imageURL: uploadUrl });    
            //console.log(uploadURL)
          }
        } catch (e) {
          console.log(e);
          if(!pickerResult.cancelled) {
            alert('Upload failed.');
          }
          
        } finally {
          this.setState({ uploading: false });               
        }
    };

    /**
     * File Upload Loader Overlay
     */
    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
          return (
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex:1
                },
              ]}>
              <ActivityIndicator color="#fff" animating size="large" />
            </View>
          );
        }
      };


    render() {
        if (this.state.loading) {
            return (
              <Root>
                <AppLoading />
              </Root>
            );
          
        }
        
        const pickerOptions = this.fire_items.map((item, index) => (
            <Picker.Item label={item.val().displayName} value={item.key} key={index} />
            ));        
        

        return (
          <Container>
            {this._maybeRenderUploadingOverlay()}
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
                      <Item > 
                        <Label>Sender</Label>
                        <Input 
                            value={firebase.auth().currentUser.displayName}
                            disabled
                        />
                      </Item>
                  </CardItem>

                  <CardItem>
                    <Item Picker>
                    <Label>Reciever</Label>  
                    <Picker
                        iosHeader = "Select a Reciever"
                        placeholder = "Select a Reciever"
                        mode="dialog"
                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                        selectedValue={this.state.reciever}
                        onValueChange={this.onValueChangeReciever.bind(this)}
                    >
                        <Picker.Item label="Select a Reciever" value="null" />
                        {pickerOptions}
                    </Picker>


                    </Item>
                  </CardItem>

                  <CardItem>
                      <Item > 
                        <Input placeholder="Accident Location" onChangeText={(location) => this.setState({location})} />
                      </Item>
                  </CardItem>

                  

                  <CardItem>
                        <Label>Please describe the accident</Label>  
                  </CardItem>
                
                      <Form style = {{ marginLeft: 20, marginRight:20 }}>
                          <Textarea rowSpan={5} bordered onChangeText={(msg) => this.setState({msg})}/>
                      </Form>

                    <CardItem></CardItem>
                    <Button iconLeft primary full onPress={this._takePhoto}>
                        <Icon name='camera' />
                        <Text>Take Photo</Text>
                    </Button>
                    <CardItem></CardItem>
                    <Button iconLeft dark full onPress={this._pickImage}>
                        <Icon name='image' />
                        <Text>Upload Image</Text>
                    </Button>
                    <CardItem></CardItem>
                    
                  <CardItem> 
                      <Body>
                          <Button full rounded success onPress={() => this.postMsg( this.state.reciever, this.state.location, this.state.msg )}>
                          <Text>Submit</Text>
                          </Button>
                      </Body>
                  </CardItem>
              </KeyboardAvoidingView>
              }
              </Card>
            </Content>
          </Container>
        );
    }    
      
}

//Handle Firebase image upload
async function uploadImageAsync(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
    .storage()
    .ref()
    .child('AccidentImages/' + uuid.v4());

    const snapshot = await ref.put(blob);
    snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log(downloadURL);
        Fire.shared.setImageURL(downloadURL);
    });

}