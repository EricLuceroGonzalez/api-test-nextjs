import { useEffect, useState } from "react";
import classes from "./comment-list.module.css";

function CommentList(props) {
  const { allComments } = props;

  return (
    <ul className={classes.comments}>
      {allComments.map((item) =>
        <li key={item._id}>
          <p>{item.text}</p>
      
          <div>
            By <address>{item.name}</address>
          </div>
      </li>
      )} 
    </ul>
  );
}

export default CommentList;
