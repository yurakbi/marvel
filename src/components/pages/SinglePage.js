import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';


const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, getComics, getCharacter, clearError} = useMarvelService();

    useEffect (() => {
        updateData()
    }, [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
<<<<<<< HEAD
            case 'comics' :
                getComic(id).then(onDataLoaded);
                break;
=======
>>>>>>> 0373cfd2fdfb920680cbae2a73a0f140f08a0714
            case 'character' :
                getCharacter(id).then(onDataLoaded);
                break;
            case 'comics':
                getComics(id).then(onDataLoaded);
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )

}

export default SinglePage;

