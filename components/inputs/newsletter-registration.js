import { useContext, useRef } from "react";
import NotificationContext from "../../store/notification-context";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);
  function registrationHandler(event) {
    event.preventDefault();
    //! Show notification: Sending....
    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering newsletter",
      status: "pending",
    });
    // ! MAKE THE FETCH
    const enteredEmail = emailInputRef.current.value;
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(
            data.message || "Something went wrong sending registration"
          );
        });
      })
      .then((data) => {
        console.log(data);
        //! Show notification: Success....
        notificationCtx.showNotification({
          title: "Success",
          message: "Successfully registered",
          status: "success",
        });
      })
      .catch((error) => {
        //! Show notification: Error....
        notificationCtx.showNotification({
          title: "Error",
          message: error.message || "Some error during registration",
          status: "error",
        });
      });
    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
