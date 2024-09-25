import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useClearAllNotificationsMutation,
  useNotificationsQuery,
} from '../../Services/Api/module/notificationApi';
import InfiniteScroll from '../../Shared/components/InfiniteScroll';
import { BUTTON_LABELS, STRINGS } from '../../Shared/constants/constants';
import { setUnseenCount } from '../../Store/UnseenCount';
import './notifications.scss';
import { cross } from '../../assets';
import ERROR_MESSAGES from '../../Shared/constants/messages';
import NotifcationBox from './components/NotificationBox';
import { Notification } from '../../Models/common';

const LIMIT = 10;

interface NotificationModalProps {
  handleChange: () => void; // Define the type for the handleChange prop
}

function NotificationModal({
  handleChange = () => {},
}: Readonly<NotificationModalProps>) {
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { data, isLoading, refetch } = useNotificationsQuery(
    {
      params: {
        skip: pageNo * LIMIT,
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
      console.error(ERROR_MESSAGES().FAILED_CLEAR_NOTIFICATIONS, error);
    }
  };

  const renderNotification = (index: number, notification: Notification) => (
    <NotifcationBox index={index} notification={notification} />
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
                  <button
                    type="button"
                    className="clear_all ml-3 btn"
                    onClick={() => clearAll()}
                  >
                    {BUTTON_LABELS.CLEAR_ALL}
                  </button>
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
