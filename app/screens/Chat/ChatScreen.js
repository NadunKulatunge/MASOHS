import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    ActivityIndicator,
} from "react-native";

import { Button, Icon } from 'native-base';

import { ImagePicker, Permissions, DocumentPicker, Linking } from 'expo';
import uuid from 'uuid';

import {GiftedChat, Bubble } from 'react-native-gifted-chat';

import Fire from './Fire';
import * as firebase from 'firebase';

//Custom Components
import RightHeaderButtons from '../../components/RightHeaderButtons.js';

console.disableYellowBox = true;

class ChatScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: 'CHAT',
        headerRight: (
            <RightHeaderButtons navigation={navigation}/>
        ),
    });

    state = {
        messages: [],
        loadEarlier: true, //Wanna allow users to read earlier messages
        isLoadingEarlier: true, //True while loading earlier messages
        uploading: false, //
        imageUploaded: false,
        documentUploaded: false,
        //imageUrl: "https://static.thenounproject.com/png/212328-200.png",
    };

    async componentDidMount() {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);
    }

    get user() {
        return {
          name: Fire.shared.displayName,
          _id: Fire.shared.uid,
        };
    }

    componentDidMount() {
        Fire.shared.on(message =>
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, message),
            isLoadingEarlier: false
          }))
        );
    }

    componentWillUnmount() {
        Fire.shared.off();
        delete Fire.shared;
        Fire.shared = new Fire();
    }

    loadMore = () => {
        messageArray1 = [];
        messageArray2 = [];
        count = 0;
        this.setState({isLoadingEarlier: true});
        Fire.shared.more(message => {

            messageArray1.push(message);
            if(count != 5){
                messageArray2.unshift(message);
            }
            count = count + 1;

            if(count == 5 ){
                for (let message of messageArray2) {
                    this.setState(previousState => ({
                        messages: GiftedChat.prepend(previousState.messages, message),
                    }))
                }
            }
            this.setState({isLoadingEarlier: false});

        })
    }

    /**
     * Left Action Buttons On Chat Textbox
     */
    renderCustomActions = (props) => {
        return (
            <View style={{flexDirection: 'row'}}>
                <Button style={{marginRight:-5}} transparent dark onPress={this._pickDocument}>
                    <Icon  name='ios-add-circle-outline' />
                </Button>
                <Button style={{marginHorizontal:-5}} transparent dark onPress={this._takePhoto}>
                    <Icon name='ios-camera-outline' />
                </Button>
            </View>
        );
    }

    /*renderFooter(props) {
        if (this.state.typingText) {
          return (
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>
                {this.state.typingText}
              </Text>
            </View>
          );
        }
        return null;
      }*/

    renderBubble = (props) => {
        const text = props.currentMessage.text;
        let url = "";
        if (text.indexOf("//") > -1) {
            hostname = text.split('/')[2];
        }
        else {
            hostname = text.split('/')[0];
        }
        if(hostname=='firebasestorage.googleapis.com'){
            url = props.currentMessage.text;
            return (
                <View>
                    {props.currentMessage.user._id != Fire.shared.uid
                        ? 
                        <Text style={{marginLeft:5, color: 'grey'}}>{props.currentMessage.user.name}</Text> 
                        : 
                        <Text></Text>
                    }
                    <Button bordered primary iconRight onPress={() => Linking.openURL(url)}>
                        <Text style={{paddingLeft:5}}> View Attachment</Text>
                        <Icon name='md-attach' />
                    </Button>
                </View>
                
            );
        }
        else if (props.isSameUser(props.currentMessage, props.previousMessage) && props.isSameDay(props.currentMessage, props.previousMessage )) {
            return (
                <Bubble
                    {...props}
                />
            );
        } 

        return (
            <View>
                {props.currentMessage.user._id != Fire.shared.uid
                    ? 
                    <Text style={{marginLeft:5, color: 'grey'}}>{props.currentMessage.user.name}</Text> 
                    : 
                    <Text></Text>
                }
                <Bubble
                {...props}
                />
            </View>
        );
        
    }

    render() {
        return (
            <View style={{flex:1}}>
            {this._maybeRenderUploadingOverlay()}
            <GiftedChat
                messages={this.state.messages}
                onSend={Fire.shared.send}
                user={this.user}
                renderActions={this.renderCustomActions}
                //renderCustomView={this.renderCustomView}
                onLoadEarlier={this.loadMore}
                loadEarlier={this.state.loadEarlier}
                isLoadingEarlier={this.state.isLoadingEarlier}
                renderBubble={this.renderBubble}
                renderAvatarOnTop = {true}
            />
            <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={80}/>
        </View>
        );
    }

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

    _takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({ //Expo launch camera
            allowsEditing: true,
            quality : 0.1,
        });

        this._handleImagePicked(pickerResult);
    };
    
    _pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({ //Expo image picker library
          allowsEditing: true,
          quality : 0.1, 
        });
        
        this._handleImagePicked(pickerResult);
    };

    _pickDocument = async () => {
        let pickerValidationErrors = null; //Validations
        let result = await DocumentPicker.getDocumentAsync({}); //Expo document picker library
        //Document selection 'success' or 'cancel'
        const selected = result.type;

        if( selected=='success' ){
            const fileSize = result.size; //FileSize
            //FileType
            const uriParts = result.name.split('.');
            const fileType = uriParts[uriParts.length - 1];
            

            //Validations
            if(fileSize > 5242880){ //File size validation in bytes
                pickerValidationErrors = "File too large. Max file size 5MB."
            }
            if(selected == 'success' && pickerValidationErrors == null){
                if(['jpg', 'jpeg', 'bmp', 'gif', 'png'].includes(fileType)){
                    this._handleImagePicked(result); //image upload 
                }else{
                    this._handleDocumentPicked(result); //document upload
                }
            }else if(pickerValidationErrors != null){
                alert(pickerValidationErrors);
            }
        }
    }

    _handleImagePicked = async pickerResult => {
        try {
          this.setState({ uploading: true });
    
          if (!pickerResult.cancelled) {
            uploadUrl = await uploadImageAsync(pickerResult.uri);
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

    _handleDocumentPicked = async result => {
        try {
          this.setState({ uploading: true });
    
          if (!result.cancelled) {
            uploadUrl = await uploadDocumentAsync(result.uri);
          }
        } catch (e) {
          console.log(e);
          if(!pickerResult.cancelled) {
            alert('Upload failed.');
          }
        } finally {
          this.setState({ uploading: false});
        }
    };
    
    
}
//ChatScreen.shared = new ChatScreen();
export default ChatScreen;

//Handle Firebase image upload
async function uploadImageAsync(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
    .storage()
    .ref()
    .child('ChatImages/' + uuid.v4());

    const snapshot = await ref.put(blob);
    snapshot.ref.getDownloadURL().then(function(downloadURL) {
    Fire.shared.setImageURL(downloadURL);
        message = [
        {
            text: '',
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            user: {
                name: Fire.shared.displayName,
                _id: Fire.shared.uid,
            },
            image: downloadURL,
        },
        ];
        Fire.shared.send(message);
        return downloadURL;
    });

}

//Handle Firebase document upload
async function uploadDocumentAsync(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
        .storage()
        .ref()
        .child('ChatDocuments/' + uuid.v4());

    const snapshot = await ref.put(blob);
    snapshot.ref.getDownloadURL().then(function(downloadURL) {
        message = [
        {
            text: downloadURL,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            user: {
                name: Fire.shared.displayName,
                _id: Fire.shared.uid,
            },
        },
    ];
    Fire.shared.send(message);
        return downloadURL;
    });

}