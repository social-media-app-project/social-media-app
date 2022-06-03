import React from 'react';
import styles from './PostDateLabel.module.css';
import moment from 'moment';

const PostDateLabel = props => {
    const date = new Date(props.timestamp);
    const formattedString = moment(date).format("MMMM Do YYYY, h:mm a");

    return (
    <span className={styles['date-label']}>{formattedString}</span>
    )
};

export default PostDateLabel;