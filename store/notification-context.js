import { createContext, useEffect, useState } from "react";

// Define structure to this context:
const NotificationContext = createContext({
  notification: null,
  showNotification: function (notificationData) {},
  hideNotification: function () {},
}); // This function is called in Layout.js

// Will return value and wrap other components
export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();

  // Set a timer and close the notification
  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }
  }, [activeNotification]);

  function showNotificationHandler(notificationData) {
    setActiveNotification({
      title: notificationData.title,
      message: notificationData.message,
      status: notificationData.status,
    });
  }
  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };
  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
