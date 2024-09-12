import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useClearAllNotificationsMutation,
  useNotificationsQuery,
} from '../../Services/Api/module/notificationApi';
import InfiniteScroll from '../../Shared/components/InfiniteScroll';
import { BUTTON_LABELS, STRINGS } from '../../Shared/constants/constants';
import { addBaseUrl } from '../../Shared/utils/functions';
import { setUnseenCount } from '../../Store/UnseenCount';
import './notifications.scss';
import { cross } from '../../assets';

const LIMIT = 10;

interface Notification {
  _id: string;
  msgRead: boolean;
  isLocked: boolean;
  backgroundColor?: string;
  htmlDescription?: string;
  icon?: string;
  type?: string;
  link?: string;
  title: string;
  createdAt: string;
  achievementProgress?: number;
  additionalInfo?: {
    bonusButtonTitle?: string;
    affiliateKey?: string;
  };
  image?: boolean;
}

interface NotificationModalProps {
  handleChange: () => void; // Define the type for the handleChange prop
}

function NotificationModal({
  handleChange = () => {},
}: NotificationModalProps) {
  const dispatch = useDispatch();
  const [pageno, setPageNo] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { data, isLoading, refetch } = useNotificationsQuery(
    {
      params: {
        skip: pageno * LIMIT,
        limit: LIMIT,
      },
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [clearAllNotification] = useClearAllNotificationsMutation();

  useEffect(() => {
    if (data?.data?.length) {
      const notificationData = data.data;
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        ...notificationData,
      ]);
      setTotalCount(data?.count ?? 1);
      if (data?.unreadCount) {
        dispatch(setUnseenCount(data?.unreadCount ?? 0));
      }
    }
  }, [data, dispatch]);

  const fetchNotifications = () => {
    setPageNo((prevPageNo) => prevPageNo + 1);
  };

  const clearAll = async () => {
    try {
      const success = await clearAllNotification({}).unwrap(); // No arguments passed here
      if (success) {
        setNotifications([]);
        setTotalCount(0);
        refetch();
      }
    } catch (error) {
      console.error('Failed to clear notifications:', error);
    }
  };

  const renderNotification = (index: number, notification: Notification) => (
    <li
      className={`notification-items ${
        !notification.msgRead ? 'unread-msg' : ''
      } ${notification.isLocked ? 'disable-casino' : ''}`}
      key={notification._id + index}
    >
      <div className="d-flex notification-container notification-list-user-block">
        <div
          className={
            notification.icon
              ? 'notification-content with-icon gap-2'
              : 'notification-content no-icon'
          }
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
          {notification.icon && (
            <img src={addBaseUrl(notification.icon)} alt="Notification Icon" />
          )}
          <div className="notification-body">
            <h4 className="h6 fw-bold">{notification.title}</h4>
            <p
              dangerouslySetInnerHTML={{
                __html: notification.htmlDescription || '',
              }}
            />
            {/* <a href={notification.link}>Read more</a> */}
          </div>
        </div>
      </div>
    </li>
  );

  return (
    <div>
      <div className="notification-modal active">
        <div className="notification-header-wrapper">
          <div className="form-row align-items-center">
            <div className="notification-header">
              <div className="col-12">
                <h2 className="h6 mb-0 d-flex justify-content-between gap-3 align-items-center">
                  <div className="fw-bold header-title">
                    {STRINGS.NOTIFICATIONS_TITLE}
                  </div>
                  <span className="clear_all ml-3" onClick={() => clearAll()}>
                    {BUTTON_LABELS.CLEAR_ALL}
                  </span>
                  <button
                    type="button"
                    className="btn-close off-nav"
                    onClick={() => handleChange()}
                  >
                    <img className="img-fluid" src={cross} alt="" />
                  </button>
                </h2>
              </div>
            </div>
          </div>
        </div>
        <ul className="notifications-list">
          {notifications.length > 0 ? (
            <InfiniteScroll
              height="calc(100vh - 100px)"
              data={notifications}
              isLoading={isLoading}
              loadMore={fetchNotifications}
              hasMore={totalCount > notifications?.length} // Assuming totalCount reflects the total number of notifications
              content={renderNotification}
            />
          ) : (
            <li className="no-notifications">{STRINGS.NO_NEW_NOTIFICATION}</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NotificationModal;
