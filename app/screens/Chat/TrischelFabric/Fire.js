import firebase from 'firebase'; 
import * as FirebasePushNotifications from "../../../utils/FirebasePushNotifications";

//Constants
import * as appConst from '../../../constants/Constants';

class Fire {
  constructor() {
    this.state = {
      imageURL: "",
      documentURL: "",
    };
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get displayName(){
    return (firebase.auth().currentUser || {}).displayName;
  }

  get ref() {
    return firebase.database().ref('messages/TrischelFabric');
  }

  parse = snapshot => { 
    this.arrayOfKeys.push(snapshot.key);
    const { createdAt: numberStamp, text, user, image } = snapshot.val();
    const { key: _id } = snapshot;
    const createdAt = new Date(numberStamp);
    const message = {
      _id,
      createdAt,
      text,
      user,
      image,
    };
    return message;
  };
  arrayOfKeys = [];
  //firstKnownKey;

  get getLastMessageKey(){ 
    let lastMessageKey = this.arrayOfKeys[0];
    this.arrayOfKeys = [];
    return lastMessageKey;
  }

  on = callback =>
    this.ref
      .orderByKey()
      .limitToLast(appConst.CHAT_INITIAL_MESSAGE_COUNT)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  more = callback =>
    this.ref
      .orderByKey()
      .endAt(this.getLastMessageKey)
      .limitToLast(appConst.CHAT_LOAD_MORE_MESSAGE_COUNT + 1) //Getting one message more (Bcz the last displayed message key is the endKey)
      //.reverse()
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  setImageURL(url){
    this.state.imageURL = url;
  }

  get imageURL(){
    return this.state.imageURL;
  }

  removeimage(){
    this.state.imageURL = null;
  }

  setDocumentURL(url){
    this.state.documentURL = url;
  }

  get getDocumentURL(){
    return this.state.documentURL;
  }

  removeDocumentURL(){
    this.state.documentURL = null;
  }

  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        createdAt: this.timestamp,
        image: this.imageURL,
      };
      this.append(message);

      if(message.text!=""){
        console.log(message.text)
        FirebasePushNotifications.funcSendPushNotificationToAllUsersExceptCurrentUserWithDepartment(firebase.auth().currentUser , message.user.name, 'Message: ' + message.text, 'ChatTrischelFabric', "Trischel Fabric (Pvt) Ltd", "Chat")
      }else{
        FirebasePushNotifications.funcSendPushNotificationToAllUsersExceptCurrentUserWithDepartment(firebase.auth().currentUser , message.user.name, 'Message: Attachment', 'ChatTrischelFabric', "Trischel Fabric (Pvt) Ltd", "Chat")
      }

    }
    this.removeimage();
    this.removeDocumentURL();
    
  };

  append = message => this.ref.push(message);

  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;
