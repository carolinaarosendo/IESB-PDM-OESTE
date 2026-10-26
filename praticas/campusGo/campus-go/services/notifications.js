import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function configurarCanal() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('campusgo-lembretes', {
      name: 'Lembretes do CampusGo',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
}

export async function pedirPermissao() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleReminder(title, seconds) {
  await configurarCanal();
  const permitido = await pedirPermissao();
  if (!permitido) return false;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'CampusGo',
      body: title,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
      channelId: 'campusgo-lembretes',
    },
  });

  return true;
}

export default { configurarCanal, pedirPermissao, scheduleReminder };