//Initialize firebase
import * as firebase from 'firebase';

export function funcSendPushNotification(token , title , body ) {
    return fetch('https://exp.host/--/api/v2/push/send', {
      body: JSON.stringify({
        to: token,
        title: title,
        body: body,
        data: { message: `${title} - ${body}` },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
}

export function funcSendPushNotificationToAllUsersExceptCurrentUser(currentUser , title , body ) {
    var query = firebase.database().ref("users").orderByKey();
    query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {

            // Get each users ID from the database
            var uID = childSnapshot.key;

            // Get each users token from the database
            var token = childSnapshot.val().expoToken;

            //If the current user dont send notification
            if(currentUser.uid != uID){
                funcSendPushNotification(token, title, body);
            }

        });
    });
}