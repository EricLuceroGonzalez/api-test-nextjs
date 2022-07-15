import { Fragment, useContext } from "react";
import NotificationContext from "../../store/notification-context";
import Notification from "../user-interface/notification";
import MainHeader from "./main-header";

function LayoutComponent(props) {
  const notificationCtx = useContext(NotificationContext)
  const activeNotification = notificationCtx.notification
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification &&
      
      <Notification
        title={activeNotification.title}
        message={activeNotification.message}
        status={activeNotification.status}
      />}
    </Fragment>
  );
}

export default LayoutComponent;
