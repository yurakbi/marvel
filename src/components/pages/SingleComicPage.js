import { useParams, Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import {useState, useEffect} from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../../components/appBanner/AppBanner';


import './singleComicPage.scss';


const SingleComicPage = () => {
    const {comicId} = useParams();

    const [comics, setComics] = useState(null);

    const {loading, error, getComics, clearError} = useMarvelService();

    useEffect(() => {
        updateComics()
    }, [comicId])

    const updateComics = () => {
        clearError();
        getComics(comicId)
            .then(onComicsLoaded)
    }

    const onComicsLoaded = (comics) => {
        setComics(comics)
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comics) ? <View comics={comics}/> : null

    return (
        <>
            <AppBanner/>
            <div className="single-comic">
                
            {errorMessage}
            {spinner}
            {content}
            </div>
        </>
    )

    
}

const View = ({comics}) => {
    const {title, description, thumbnail, price, pageCount, language} = comics;
    let imgStyle = { 'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }
    return (
        <>
            
            <img style={imgStyle} src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </>
    )
}

export default SingleComicPage;