import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../reducks/users/operations';
import Home from '../containers/Home';
import CrossX from '../assets/img/cross.png';
import { push } from 'connected-react-router';
import { useNavigate, Link } from 'react-router-dom';


const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const closeButton = () => {
        dispatch(push('/'));
    };

    const [email, setEmail] = useState(''),
        [password, setPassword] = useState('');

    const inputEmail = event => {
        setEmail(event.target.value);
    };

    const inputPassword = event => {
        setPassword(event.target.value);
    };


    const signInButton = () => {
        if(email, password){
             dispatch(signIn(email, password, navigate));
        }
        setEmail('');
        setPassword('');
    };
    return (
        <>
            <Home />
            <section className="gradient">
                <section class="popup">
                    <div class="popup-inner">
                        <span onClick={closeButton}>
                            <Link to="/">
                                {' '}
                                <img src={CrossX} class="close" />{' '}
                            </Link>
                        </span>
                    </div>
                    <div class="popup-preview">
                        <div class="input">
                            <div className="heading-sign-in">
                                <h2>Log In</h2>
                                <p> Login to shop for cool T-shirts</p>
                            </div>
                            <div className="input-feilds">
                                <input
                                    type="email"
                                    onChange={inputEmail}
                                    required
                                    placeholder="Email address"
                                    value={email}
                                />{' '}
                                <br />
                                <br />
                                <input
                                    type="password"
                                    onChange={inputPassword}
                                    required
                                    placeholder="Password"
                                    vlaue={password}
                                />
                                <br />
                                <button class="button" onClick={signInButton}>
                                    SIGN IN
                                </button>
                                <p class="bottom">
                                    Not a Member?
                                    <Link to="/signup">
                                        <u>Join Us.</u>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
};

export default Signin;
