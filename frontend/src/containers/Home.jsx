import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../assets/img/loading.gif';
import postImage from '../assets/img/newspaper-icon-png.jpg';
import PostForm from '../components/Posts/PostForm';
import Post from '../components/Posts/Post';
import { fetchPosts } from '../reducks/posts/operations';
import { getPosts } from '../reducks/posts/selectors';
import { Link } from 'react-router-dom';


const Home = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    // const [posts, setPosts]= useState([])
    const posts = getPosts(selector);
    console.log('posts', posts.list.length);
    const [key , setKey]= useState(localStorage.getItem('LOGIN_USER_KEY'))

    
    let [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [temp, setTemp]= useState(true)

    useEffect(() => {
        if(key){
            dispatch(fetchPosts({ page }));
            // setTemp(!temp)
        }


        // eslint-disable-next-line
    }, [key, temp]);

    // Infinite Scroll Pagination Flow
    const observer = useRef();

    // Reference to a very last post element
    const lastPostElement = useCallback(
        node => {
            if (isLoading) return;
            // Disconnect reference from previous element, so that new last element is hook up correctly
            if (observer.current) {
                observer.current.disconnect();
            }

            // Observe changes in the intersection of target element
            observer.current = new IntersectionObserver(async entries => {
                // That means that we are on the page somewhere, In our case last element of the page
                if (entries[0].isIntersecting && posts.next) {
                    // Proceed fetch new page
                    setIsLoading(true);
                    setPage(++page);
                    await dispatch(fetchPosts({ page }));
                    setIsLoading(false);
                }
            });

            // Reconnect back with the new last post element
            if (node) {
                observer.current.observe(node);
            }
        },
        // eslint-disable-next-line
        [posts.next]
    );
    const logOut = ()=>{
        localStorage.clear()
        setKey(null)
    }

    return (
        <section className="content">
            {key && <button onClick={logOut} className="login-btn log-out">Logout</button>}
            <PostForm setTemp={setTemp}/>
            <section className="posts">
                { key && posts && posts.list.length>0 && posts.list.map((post, index)=>{
                    return(
                        <Post
                                    ref={index === posts.list.length - 1 ? lastPostElement : null}
                                    key={post.id}
                                    post={post}
                            setTemp={setTemp}
                                />
                    )
                }) }
                {!key &&  <div>
                    <Link to='/signup' >
                        <button className="login-btn">SignUp / SignIn</button>
                               
                    </Link>
                    </div>}
                {isLoading && (
                    <div className="loading">
                        <img src={Loading} className="" alt="" />
                    </div>
                )}
            </section>
        </section>
    );
};

export default Home;
