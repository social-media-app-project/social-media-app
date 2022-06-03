import React, { useState } from 'react';
import styles from './ImageSlideshow.module.css';
import picOne from '../../test-data/test-images/landscape1.jpg';
import picTwo from '../../test-data/test-images/landscape2.jpg';
import picThree from '../../test-data/test-images/vertical.jpg';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import Image from './Image/Image';

const ImageSlideshow = () => {
    const [ imageIndex, setImageIndex ] = useState(0);

    const images = [ picOne, picTwo, picThree ];

    const handleBackClick = () => {
        const newImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;
        setImageIndex(newImageIndex);
    }

    const handleForwardClick = () => {
        let newImageIndex = (imageIndex + 1) % images.length;
        setImageIndex(newImageIndex);
    }

    return (
    <>
        {images.length > 1 ? <span>{imageIndex + 1} of {images.length}</span> : null}
        <div className={styles['slideshow']}>
            { (images.length > 1) ?
                <button className={styles['arrow']} onClick={handleBackClick}>
                    <IoIosArrowBack />
                </button>
                : null
            }
            {
                images.map((imageSrc, index) => {
                    return (<Image  key={index} index={index} imageSrc={imageSrc} currIndex={imageIndex} />)
                })
            }
            { (images.length > 1) ?
                <button className={styles['arrow']} onClick={handleForwardClick}>
                    <IoIosArrowForward />
                </button>
                : null
            }
        </div>
    </>
    )
};

export default ImageSlideshow;