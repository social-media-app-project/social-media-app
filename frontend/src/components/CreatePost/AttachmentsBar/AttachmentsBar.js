import React from 'react';
import styles from './AttachmentsBar.module.css';
import { FaImages } from 'react-icons/fa';

const AttachmentsBar = () => {
    return (
    <div className={styles['attachments-bar']}>
        <FaImages/>
    </div>
    )
};

export default AttachmentsBar;