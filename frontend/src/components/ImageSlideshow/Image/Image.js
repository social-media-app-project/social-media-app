import React from 'react';
import styles from './Image.module.css';

const Image = props => {
    const { index, currIndex, imageSrc } = props;
    console.log(props);
    const appearStyle = { display: index === currIndex ? 'flex' : 'none' }

    return (
    <div className={styles['picture-container']} style={appearStyle}>
        <img className={styles['picture']} src={imageSrc} alt='Post' />
    </div>
    )
};

export default Image;