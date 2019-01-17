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

//Constants
import * as appConst from '../../constants/Constants';
import * as appErrorMsgs from '../../constants/ErrorMessages';


//Offline Notice
import OfflineNotice from '../../components/OfflineNotice'

console.disableYellowBox = true;

class ChatScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: 'Chat',
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
            if(count != appConst.CHAT_LOAD_MORE_MESSAGE_COUNT){
                messageArray2.unshift(message);
            }
            count = count + 1;

            if(count == appConst.CHAT_LOAD_MORE_MESSAGE_COUNT ){
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
            <OfflineNotice />
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
                quality : appConst.CHAT_IMAGE_QUALITY,
            });
    
            this._handleImagePicked(pickerResult);
      
        
    };
    
    _pickImage = async () => {
        this.askPermissions();
        let pickerResult = await ImagePicker.launchImageLibraryAsync({ //Expo image picker library
          allowsEditing: true,
          quality : appConst.CHAT_IMAGE_QUALITY, 
        });
        
        this._handleImagePicked(pickerResult);
    };

    _pickDocument = async () => {
        this.askPermissions();
        let pickerValidationErrors = null; //Validations
        let pickerResult = await DocumentPicker.getDocumentAsync({}); //Expo document picker library
        //Document selection 'success' or 'cancel'
        const selected = pickerResult.type;

        if( selected=='success' ){
            const fileSize = pickerResult.size; //FileSize
            //FileType
            const uriParts = pickerResult.name.split('.');
            const fileType = uriParts[uriParts.length - 1];
            

            //Validations
            if(fileSize > appConst.CHAT_MAX_FILE_SIZE){ //File size validation in bytes
                pickerValidationErrors = appErrorMsgs.CHAT_MAX_FILE_SIZE_ERROR;
            }
            if(selected == 'success' && pickerValidationErrors == null){
                if(appConst.CHAT_IMAGE_FILE_TYPES.includes(fileType)){
                    this._handleImagePicked(pickerResult); //image upload 
                }else{
                    this._handleDocumentPicked(pickerResult); //document upload
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

    _handleDocumentPicked = async pickerResult => {
        try {
          this.setState({ uploading: true });
    
          if (!pickerResult.cancelled) {
            uploadUrl = await uploadDocumentAsync(pickerResult.uri);
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