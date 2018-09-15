import firebase from 'firebase'; 

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
    return firebase.database().ref('messages');
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
      .limitToLast(10)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  more = callback =>
    this.ref
      .orderByKey()
      .endAt(this.getLastMessageKey)
      .limitToLast(6) //Getting one message more (Bcz the last displayed message key is the endKey)
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

  /*get uploadProgress(){
    return(
      <List>
        <ListItem thumbnail>
          <Left>
            <Thumbnail square source={{ uri: this.imageURL }} />
          </Left>
          <Body>
            <Text>{this.state.progressValue}</Text>
            <Text note numberOfLines={1}>Its time to build a difference . .</Text>
          </Body>
          <Right>
            <Button transparent>
              <Text>View</Text>
            </Button>
          </Right>
        </ListItem>
      </List>
    )
  }*/

  /*setUploadProgress(progress){
    this.state.progressValue = progress;
    console.log(progress)
  }*/
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