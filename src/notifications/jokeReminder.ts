// src/notifications/jokeReminder.ts
import * as Notifications from 'expo-notifications';

export async function scheduleHourlyJokeNotification() {
    // If you only ever want one hourly reminder, clear previous ones
    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Programming joke time',
            body: 'Open the app to see a new joke!',
            data: { type: 'joke-reminder' },
        },
        trigger: {
            // repeat every 1 hour
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: 60 * 60,
            repeats: true,
        },
    });
}
