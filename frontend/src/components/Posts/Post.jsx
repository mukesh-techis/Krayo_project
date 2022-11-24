import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import IconSmallMenu from '../../assets/img/icon-small-menu.svg';
import IconUser from '../../assets/img/global.png';
import { deletePost } from '../../reducks/posts/operations';
import { saveAs } from 'file-saver'

const Post = React.forwardRef((props, ref) => {
    const { post } = props;
    const dispatch = useDispatch();
    const [menuToggle, setMenuToggle] = useState(false);

    const downloadImage = (image_url) => {
        saveAs(image_url, 'image.jpg') // Put your image url here.
    }

    const deleteHandler = () => {
        dispatch(deletePost(post.id));
    };

    const settingHandler = () => {
        setMenuToggle(!menuToggle);
    };

    const getDate = date => {
        return new Date(date).toLocaleDateString('en-Us', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <li ref={ref}>
            <img className="menu_icon" onClick={settingHandler} src={IconSmallMenu} alt="setting" />
            {menuToggle && (
                <div className="menu">
                    <span onClick={deleteHandler}>Delete</span>
                </div>
            )}
            <div className="logo">
                <img src={IconUser} alt="user-profile" />
            </div>
            <div className="name_body">
                <div className="name">{post.user.user_name}</div>
                <div className="datetime"><span>Uploaded on : </span>{getDate(post.created_at)}</div>
                <p className="body">{post.body}</p>
                {post.image && (
                    <a href={post.image} target="_blank" rel="noopener noreferrer">
                        <img className="post-image" src={post.image} alt="thumbnail" />
                        <button className='login-btn download' onClick={() => downloadImage(post.image)}>Download Me!</button>
                    </a>
                )}
            </div>
        </li>
    );
});

export default Post;
