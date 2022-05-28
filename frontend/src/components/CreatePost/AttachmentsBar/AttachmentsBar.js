import React from 'react';
import styles from './AttachmentsBar.module.css';
import { FaImages } from 'react-icons/fa';

const AttachmentsBar = () => {
    return (
    <div className={styles['attachments-bar']}>
        <button>
            <FaImages/>
        </button>
    </div>
    )
};

export default AttachmentsBar;