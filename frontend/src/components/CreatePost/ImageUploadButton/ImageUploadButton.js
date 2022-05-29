import { FaImages } from 'react-icons/fa';
import React, { useRef } from 'react';
import styles from './ImageUploadButton.module.css';

const ImageUploadButton = () => {
    const imageInputRef = useRef();

    const handleImageUpload = e => {
        //validate the files
        //display the images
    };

    return (
    <div>
        <button onClick={() => imageInputRef.current.click()}>
            <FaImages />
        </button>
        <input 
            ref={imageInputRef} 
            accept="image/*"
            onChange={handleImageUpload}
            multiple
            type="file" 
            hidden 
        />
    </div>
    )
};

export default ImageUploadButton;