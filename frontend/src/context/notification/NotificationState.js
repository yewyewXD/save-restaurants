import React, { createContext, useState, useCallback, useContext } from "react";
import NotificationBar from "../../globalUI/Notification/NotificationBar";

export const NotificationContext = createContext({});

export function NotificationProvider({ children }) {
  const [isShowingNotification, setIsShowingNotification] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(null);
  const showNotification = useCallback(
    (status) => {
      setNotificationStatus(status);
      if (!isShowingNotification) {
        setIsShowingNotification(true);

        setTimeout(() => {
          setIsShowingNotification(false);
        }, 5000);
      }
    },
    [isShowingNotification]
  );
  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {isShowingNotification && (
        <NotificationBar notificationStatus={notificationStatus} />
      )}

      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const { showNotification } = useContext(NotificationContext);

  return { showNotification };
}
