import axios from 'axios';
const LOGIN_USER_KEY = 'LOGIN_USER_KEY';

var baseURL;
if (process.env.REACT_APP_ENVIRONMENT && process.env.REACT_APP_ENVIRONMENT === 'PRODUCTION') {
    baseURL = process.env.REACT_APP_API_BASE_URL;
} else baseURL = 'http://127.0.0.1:8000';



const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    config => {
        if (localStorage.getItem(LOGIN_USER_KEY)) {
            config.headers.common['Authorization'] = JSON.parse(localStorage.getItem(LOGIN_USER_KEY)).token;
        }

        return config;
    },
    err => {
        console.error(err);
    }
);

export default class API {
    //////////////////////////////
    // USERS
    /////////////////////////////

    signUp = async (user_name, email, password) => {
        const savedPost = await api
            .post('/users/signup/', {
                user_name: user_name,
                email: email,
                password: password
            })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
        return savedPost;
    };

    signIn = async (email, password) => {
        const savedPost = await api
            .post('/users/signin/', {
                email: email,
                password: password
            })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
        return savedPost;
    };

    getUsers = async () => {
        const posts = await api
            .get('/users/')
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
        return posts;
    };

    // ///////////////////////////////////////
    // Items
    // ///////////////////////////////////////
    getPosts = async () => {
        const posts = await api
            .get('/')
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
        return posts;
    };

    addPost = async (name, body, image) => {
        const formData = new FormData();
        const abc= parseInt(JSON.parse(localStorage.getItem(LOGIN_USER_KEY)).id)
        formData.append('name', name.name);
        formData.append('body', name.body);
        formData.append('image', name.image);
        formData.append('user',abc)

        const savedPost = await api
            .post('add/', formData)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
        return savedPost;
    };

    deletePost = async id => {
        const response = await api
            .delete('delete/' + id + '/')
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
        return response;
    };
}
