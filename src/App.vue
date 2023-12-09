<script lang="ts" setup>
import { onMounted } from 'vue';
import { useQuasar } from 'quasar';

import { useAuthStore } from './stores/authStore';
import { useHomeStore } from './stores/homeStore';

const authStore = useAuthStore();
const homeStore = useHomeStore();

const $q = useQuasar();

/* const fbPlug = () => {
  if ($q.platform.is.mobile) {
    var customChannel = {
      id: 'general_channel',
      name: 'General',
      sound: 'blackberry',
      vibration: [300, 200, 300],
      light: true,
      lightColor: '0xFF0000FF',
      importance: 4,
      badge: true,
      visibility: 1,
    };
    try {
      FirebasePlugin.createChannel(
        customChannel,
        function () {
          console.log('Channel created');
        },
        function (error: any) {
          console.log('Create channel error: ' + error);
        }
      );
    } catch (error) {
      alert('Error creating channel: ' + error);
    }
  }
}; */

/* const getDeviceTokenFB = () => {
  try {
    FirebasePlugin.getToken(
      function (token: any) {
        console.log('Token: ' + token);
        authStore.saveTokenDispositive(token);
      },
      function (error: any) {
        console.log('Error getting token: ' + error);
        alert('Error getting token: ' + error);
        getDeviceTokenFB();
      }
    );
  } catch (error) {
    alert('Error getting token' + error);
  }
}; */

const onesignalinit = () => {
  document.addEventListener('deviceready', OneSignalInit, false);
  function OneSignalInit() {
    // Uncomment to set OneSignal device logging to VERBOSE
    // window.plugins.OneSignal.setLogLevel(6, 0);

    // NOTE: Update the setAppId value below with your OneSignal AppId.
    window.plugins.OneSignal.setAppId('ab85cdf9-fce5-4f66-984a-b1759e5d0c42');
    window.plugins.OneSignal.setNotificationOpenedHandler(function (
      jsonData: any
    ) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      // alert('notificationOpenedCallback: ' + JSON.stringify(jsonData.notification.additionalData));
      if (jsonData.notification.additionalData) {
        const data = jsonData.notification.additionalData;
        if (data.type === 'promotion') {
          /* alert('promotion entro');
          alert(homeStore.isRedirectPromotion); */
          homeStore.changeRedirectPromotion()
          /* alert(homeStore.isRedirectPromotion); */
        }
      }
    });

    //Prompts the user for notification permissions.
    //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 6) to better communicate to your users what notifications they will get.
    window.plugins.OneSignal.promptForPushNotificationsWithUserResponse(
      function (accepted: any) {
        console.log('User accepted notifications: ' + accepted);
      }
    );

  }

  const isDispositive = authStore.verifyUidDispositive();
  if (!isDispositive) {
    const externalUserId = authStore.generateUidDispositiveAndSaveStorage();
    window.plugins.OneSignal.setExternalUserId(externalUserId);
  }
};

onMounted(() => {
  if ($q.platform.is.mobile) {
    onesignalinit();
  }
});
</script>

<template>
  <router-view class="my-font" />
</template>
