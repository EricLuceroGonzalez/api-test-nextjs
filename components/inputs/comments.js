import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);
  const [showComments, setShowComments] = useState(false);
  const [isFetchingComment, setIsFetchingComment] = useState(false)
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComment(true)
      fetch("/api/comments/" + eventId)
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
        .then((data) => 
        {setComments(data.comments)
        setIsFetchingComment(false)});
    }
    return () => {};
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Sending",
      message: "Comment is being stored",
      status: "pending",
    });
    // send data to API
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || 'Error here in comment')
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Saved",
          message: "Comment has been stored.",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error",
          message: error.message || "Some error ocurred when saving comment.",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComment && <CommentList allComments={comments} />}
      {showComments && isFetchingComment && <p>Loading comments...</p>}
    </section>
  );
}

export default Comments;
