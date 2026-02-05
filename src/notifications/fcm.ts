import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Alert, Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export async function registerForFCMToken() {
    if (!Device.isDevice) {
        Alert.alert('Notifications', 'Must use physical device');
        return null;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        Alert.alert('Permission required', 'Enable notifications in settings');
        return null;
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
        });
    }

    const { data: devicePushToken } =
        await Notifications.getDevicePushTokenAsync();

    console.log('🔥 FCM device token:', devicePushToken);
    Alert.alert(
        'FCM token',
        (devicePushToken || '').slice(0, 100) + '...',
    );

    return devicePushToken;
}
