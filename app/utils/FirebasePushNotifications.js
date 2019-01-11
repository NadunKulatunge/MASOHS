//Initialize firebase
import * as firebase from 'firebase';

/**
 * Send Push Notifications
 * How to use:
 * import * as FirebasePushNotifications from "../utils/FirebasePushNotifications";
 * //FirebasePushNotifications.funcSendPushNotification("ExponentPushToken[P2ENaNMqe10xjTSFTmgBtE]", 'Test', 'Test2')
 * //FirebasePushNotifications.funcSendPushNotificationToAllUsersExceptCurrentUser(user, "Hey Everyone!!", "If you recieve this msg send me a Thumbs Up. Thank you. ~ Nadun")
 */
export function funcSendPushNotification(token , title , body ) {
    return fetch('https://exp.host/--/api/v2/push/send', {
      body: JSON.stringify({
        to: token,
        title: title,
        body: body,
        ttl: 2419200, //Time to Live of message 28 Days
        data: { message: `${title} - ${body}` },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
}


export function funcSendPushNotificationToUserID(currentUser, recieverID, title , body, navigateTo="") {
    /*Create user with unique key of 'uid'*/
    var usersRef = firebase.database().ref("privateNotifications/"+ recieverID);
    usersRef.push({ 
        title: title,
        body: body,
        sender: currentUser.uid,
        navigateTo: navigateTo
    });

    //find recievers token and if its available send him a push notification
    var query = firebase.database().ref("users/"+ recieverID).orderByKey();
    query.once("value")
        .then(function(snapshot) {
            if(snapshot.val().muteNotifications!="True"){
                funcSendPushNotification(snapshot.val().expoToken, title, body)
            }
    });

}

//currentUser is the users JSON file
export function funcSendPushNotificationToAllUsersExceptCurrentUser(currentUser , title , body, navigateTo="") {
    /*Create user with unique key of 'uid'*/
    var usersRef = firebase.database().ref("publicNotifications");
    usersRef.push({ 
        title: title,
        body: body,
        sender: currentUser.uid,
        navigateTo: navigateTo,
        department: ""
    });

    var query = firebase.database().ref("users").orderByKey();
    query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {

            // Get each users ID from the database
            var uID = childSnapshot.key;

            // Get each users token from the database
            var token = childSnapshot.val().expoToken;

            //If the current user dont send notification
            if(currentUser.uid != uID && childSnapshot.val().muteNotifications!="True"){
                funcSendPushNotification(token, title, body);
            }

        });
    });
}


//currentUser is the users JSON file
export function funcSendPushNotificationToAllUsersExceptCurrentUserWithDepartment(currentUser , title , body, navigateTo="", department, displayIcon) {
    /*Create user with unique key of 'uid'*/
    var usersRef = firebase.database().ref("publicNotifications");
    usersRef.push({ 
        title: title,
        body: body,
        sender: currentUser.uid,
        navigateTo: navigateTo,
        department: department,
        displayIcon: displayIcon
    });

    var query = firebase.database().ref("users").orderByKey();
    query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {

            // Get each users ID from the database
            var uID = childSnapshot.key;

            // Get each users token from the database
            var token = childSnapshot.val().expoToken;

            //If the current user dont send notification
            if(currentUser.uid != uID && childSnapshot.val().muteNotifications!="True"){
                if(childSnapshot.val().role == "superadmin"){ //If superadmin then send notification
                    funcSendPushNotification(token, title, body);
                }else if(childSnapshot.val().role != "superadmin" && childSnapshot.val().department == department){ //if not super admin send notif if user is in that department
                    funcSendPushNotification(token, title, body);
                }  
            }

        });
    });
}