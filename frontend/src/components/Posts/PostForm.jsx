import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addPost } from '../../reducks/posts/operations';

const PostForm = ({ setTemp }) => {
    const dispatch = useDispatch();
    const initialValues = { name: '', body: '' };
    const [values, setValues] = useState(initialValues);
    const [previewImage, setPreviewImage] = useState(null);
    const [image, setImage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputFile = useRef(null);

    const handleInputChange = e => {

        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };
    const key = JSON.parse(localStorage.getItem('LOGIN_USER_KEY'))
    let user
    if (key) {
        user = key.user_name
    }
    console.log(user);

    const inputImage = event => {
        const file = event.target.files[0];
        const objectUrl = URL.createObjectURL(file);
        setPreviewImage(objectUrl);
        setImage(file);
    };

    const addPostButton = async () => {
        if (!values.body.trim()) {
            alert(`Please fill out all required form.`);
            return;
        }
        setIsLoading(true);

        await dispatch(addPost({ name: 'default', body: values.body, image }));

        setIsLoading(false);
        setValues({ name: '', body: '' });
        setPreviewImage(null);
        setImage([]);
        setTemp(Math.random())
        inputFile.current.value = '';
    };

    return (
        <section className="post_form">
            <h1>Welcome {user}</h1>
            {/* <input
                type="text"
                name="name"
                value={values.name}
                placeholder="Name"
                onChange={handleInputChange}
                required
            /> */}
            <textarea
                name="body"
                value={values.body}
                placeholder="Note / File name"
                onChange={handleInputChange}
                required
            ></textarea>
            <input type="file" ref={inputFile} onChange={inputImage} />
            {previewImage && (
                <div className="upload-area">
                    <img
                        name="image"
                        type="file"
                        src={previewImage}
                        className={`upload-image ${previewImage ? 'preview-image' : ''}`}
                        alt="Upload"
                    />
                </div>
            )}
            <button type="button" onClick={addPostButton}>
                {isLoading ? 'Uploading...' : 'Upload'}
            </button>
        </section>
    );
};

export default PostForm;
