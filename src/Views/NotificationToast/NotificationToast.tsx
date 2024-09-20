/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNotificationsQuery } from '../../Services/Api/module/notificationApi/index';
import { addBaseUrl } from '../../Shared/utils/functions';
import { RootState } from '../../Store/index';
import { whiteCross } from '../../assets';
import './notificationToast.scss';
import { setUnseenCount } from '../../Store/UnseenCount';
import { STRINGS } from '../../Shared/constants/constants';

const LIMIT = 10;

interface NotificationInApp {
  msgRead: boolean;
  isLocked: boolean;
  backgroundColor?: string;
  htmlDescription?: string; // This seems to be the correct field instead of 'body'
  icon?: string;
  type?: string;
  link?: string;
  title: string;
  body: string;
  createdAt: string;
  achievementProgress?: number;
  additionalInfo?: {
    bonusButtonTitle?: string;
    affiliateKey?: string;
  };
  image?: string;
}

interface NotificationEvent {
  data: {
    title: string;
    message: string;
    url: string;
    icon: string;
    image: string;
  };
}

function NotificationToast() {
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState<number>(1);
  const [show, setShow] = useState<boolean>(false);
  const [notification, setNotification] = useState<
    NotificationInApp | undefined
  >(undefined);
  const userToken = useSelector((state: RootState) => state.common.token);
  const unseenCount = useSelector(
    (state: RootState) => state.unseenCount.count
  );
  const { data } = useNotificationsQuery({
    skip: pageNo - 1,
    limit: LIMIT,
  });

  const handleMessage = (event: NotificationEvent) => {
    const { title, message, url, icon, image } = event.data;
    if (title || message || url || icon || image) {
      setShow(true);
      setNotification({
        title,
        body: message,
        image: icon,
        link: url,
        msgRead: false, // default value
        isLocked: false, // default value
        createdAt: new Date().toISOString(), // current timestamp or any other appropriate value
      });
      setPageNo(1);
    }
    dispatch(setUnseenCount(unseenCount + 1));
    console.log('Received Notification in React Component:', {
      title,
      message,
      url,
      icon,
      image,
      data,
    });
  };

  useEffect(() => {
    try {
      if ('BroadcastChannel' in window) {
        const channel = new BroadcastChannel('push-notification-channel');
        channel.addEventListener('message', handleMessage);
        return () => {
          channel.removeEventListener('message', handleMessage);
        };
      }
    } catch (error) {
      console.error('Error setting up push notification:', error);
    }
  }, []);

  useEffect(() => {
    dispatch(setUnseenCount(data?.count));
  }, [data]);

  const handleClose = () => {
    setShow(false);
  };
  return (
    <div>
      {!userToken ? null : (
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          autohide
          animation
        >
          <Toast.Header closeButton>
            <div
              className="w-100 d-flex completed_steps notification-container"
              onClick={() =>
                notification?.link
                  ? window.open(notification.link, '_blank')
                  : ''
              }
            >
              <span
                className="notification-icon"
                style={{
                  backgroundColor: notification?.backgroundColor
                    ? `rgba(${parseInt(
                        notification.backgroundColor.slice(-6, -4),
                        16
                      )}, ${parseInt(
                        notification.backgroundColor.slice(-4, -2),
                        16
                      )}, ${parseInt(
                        notification.backgroundColor.slice(-2),
                        16
                      )}, 0.5)`
                    : '',
                }}
              >
                <img
                  style={{
                    backgroundColor: 'transparent',
                  }}
                  src={addBaseUrl(notification?.image ?? STRINGS.EMPTY_STRING)}
                  alt=""
                  width="50"
                  height="50"
                />
              </span>
              <div
                className="message_summary"
                style={{
                  backgroundColor: notification?.backgroundColor
                    ? `rgba(${parseInt(
                        notification.backgroundColor.slice(-6, -4),
                        16
                      )}, ${parseInt(
                        notification.backgroundColor.slice(-4, -2),
                        16
                      )}, ${parseInt(
                        notification.backgroundColor.slice(-2),
                        16
                      )}, 0.4)`
                    : '',
                }}
              >
                <div className="toast-content-wrapper">
                  <h6 className="h6 text-white">{notification?.title}</h6>
                  <small className="notification_time">
                    {notification?.createdAt}
                  </small>
                </div>
                {notification?.body ? (
                  <p>
                    {notification.body.length > 150
                      ? `${notification.body.substring(0, 150)}...`
                      : notification.body}
                  </p>
                ) : null}
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="p-0 ms-3 close-btn btn-transparent"
            >
              <img src={whiteCross} alt="" width={20} />
            </button>
          </Toast.Header>
        </Toast>
      )}
    </div>
  );
}

export default NotificationToast;
