import { Notification } from '../../../Models/common';
import { STRINGS } from '../../../Shared/constants/constants';
import { VariableTypes } from '../../../Shared/constants/enums';
import { addBaseUrl } from '../../../Shared/utils/functions';

interface NotifcationBoxProp {
  index: number;
  notification: Notification;
}
function NotifcationBox({ index, notification }: Readonly<NotifcationBoxProp>) {
  function hexToRgba(hex: string, alpha = 1) {
    if (!hex || typeof hex !== VariableTypes.string) return '';

    // Remove any leading "#" if present
    const cleanHex = hex.replace('#', '');

    if (cleanHex.length !== 6) return ''; // Ensure it's a 6-character hex code

    // Parse the R, G, and B values from the hex string
    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);

    // Return the RGBA color string
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  const backgroundColor = notification?.backgroundColor
    ? hexToRgba(notification.backgroundColor, 0.4)
    : '';
  const style = {
    backgroundColor,
  };
  return (
    <li
      className={`notification-items ${
        !notification?.msgRead ? 'unread-msg' : ''
      } ${notification?.isLocked ? 'disable-casino' : ''}`}
      key={`${notification?._id}-${index}`}
    >
      <div className="d-flex notification-container notification-list-user-block">
        <div
          className={
            notification?.icon
              ? 'notification-content with-icon gap-2'
              : 'notification-content no-icon'
          }
          style={style}
        >
          {notification?.icon && (
            <img src={addBaseUrl(notification?.icon)} alt="Notification Icon" />
          )}
          <div className="notification-body">
            <h4 className="h6 fw-bold">{notification?.title}</h4>
            <p
              dangerouslySetInnerHTML={{
                __html: notification?.htmlDescription ?? STRINGS.EMPTY_STRING,
              }}
            />
          </div>
        </div>
      </div>
    </li>
  );
}

export default NotifcationBox;
