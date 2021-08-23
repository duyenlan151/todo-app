import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage = new BehaviorSubject(null);
  constructor(private angularFireMessaging: AngularFireMessaging) {
    // this.angularFireMessaging.messaging.subscribe(
    // (_messaging) => {
    //   _messaging.onMessage = _messaging.onMessage.bind(_messaging);
    //   _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    // })
    this.angularFireMessaging.messages.subscribe(
      (_messaging: AngularFireMessaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      })

  }
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        // console.log(token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        var options = {
          body: 'Here is a notification body!',
          icon: 'favicon.ico',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          }
        };
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistration('./firebase-cloud-messaging-push-scope').then(function (registration) {
            setTimeout(() => {
              registration.showNotification('Hello world!', options);
              registration.update();
            }, 100);
          }).catch(function (err) {
            console.log("No Service Worker Registered", err);
          })
        } else {
          console.log('Error push message');
        }
        this.currentMessage.next(payload);
      })
  }
}
