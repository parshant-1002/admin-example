importScripts("https://cdn.pushalert.co/sw-73683.js");

function callbackOnNotificationReceive(data) {
    // Implement your logic here to handle the received notification
    const channel = new BroadcastChannel('push-notification-channel');
    console.log('channel created:', channel, channel?.postMessage);
    channel.postMessage(data);
    console.log('Notification received:', data);
}

self.addEventListener('push', function (event) {
    let data = (event && event.data && event.data.json()) || {};
    console.log('addEventListener-runs:', data);

    // Call your custom function to handle the notification
    callbackOnNotificationReceive(data);
});