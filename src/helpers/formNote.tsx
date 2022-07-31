import { notification } from 'antd';
import 'antd/dist/antd.css';

type NotificationType = 'success' | 'warning' | 'error';

const openNotificationWithIcon = (type: NotificationType, text: string) => {
  notification[type]({
    message: text,
    maxCount: 3,
  });
};

notification.config({
  duration: 3,
  maxCount: 3,
});

export const formNote = (typeNote: NotificationType, text: string) => openNotificationWithIcon(typeNote, text);
