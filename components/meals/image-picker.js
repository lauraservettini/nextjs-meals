'use client';

import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({label, name}) {
    const [pickedImage, setPickedImage] = useState();

    const picker = useRef();

    function handlePicker() {
        picker.current.click();
    }

    function handleImageChange(event) {
        const file = event.target.files[0];

        if(!file){
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();

        //onload eseguida con readAsDataURL
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }

    return <div className={classes.picker}>
        <label htmlFor={name} >
            {label}
        </label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {!pickedImage && <p>No image picked yet.</p>}
                {pickedImage && 
                    <Image 
                        src={pickedImage} 
                        alt='The image selected by the user'
                        fill
                    />}
            </div>
            <input 
                ref={picker}
                onChange={handleImageChange}
                className={classes.input}
                type='file' 
                id={name} 
                name={name} 
                accept='image/jpg, image/png, image/jpeg'
                required />
            <button className={classes.button} type='button' onClick={handlePicker}>
                Pick an image
            </button>
        </div>
    </div>
}