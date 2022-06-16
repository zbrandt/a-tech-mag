import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Typography, Toolbar, Button, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { getPostsBySearch } from '../../actions/posts';
import SearchIcon from '@mui/icons-material/Search';

import useStyles from './styles';
import atechmag from '../../images/tech mag.png';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        navigate('/');

        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = jwt_decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPosts();
        }
    };

    const searchPosts = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(',')}`);
        } else {
            navigate('/');
        }
    };

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div classesName={classes.brandContainer}>
                <Link to="/"><img className={classes.image} src={atechmag} alt="atechmag" height="240" /></Link>
            </div>
            <div className={classes.toolbar}>
                <Button onClick={searchPosts} className={classes.searchButton}>
                    <SearchIcon color="primary" sx={{ fontSize: 40 }} />
                </Button>
                <TextField 
                    name="search" 
                    variant="outlined"
                    label="Search Articles"
                    onKeyPress={handleKeyPress}
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </AppBar>
    )
}

export default Navbar;