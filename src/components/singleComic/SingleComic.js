import useMarvelService from '../../services/MarvelService';
import {useState, useEffect} from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


import './singleComic.scss';


const SingleComic = (props) => {

    const [comics, setComics] = useState(null);

    const {loading, error, getComics, clearError} = useMarvelService();

    useEffect(() => {
        updateComics()
    }, [props.comicsId])

    const updateComics = () => {
        const {comicsId} = props;
        if(!comicsId) return;
        clearError();
        getComics(comicsId)
            .then(onComicsLoaded)
    }

    const onComicsLoaded = (comics) => {
        setComics(comics)
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comics) ? <View comics={comics}/> : null

    return (
        
        <div className="single-comic">
           {errorMessage}
           {spinner}
           {content}
        </div>
    )

    
}

const View = ({comics}) => {
    const {title, description, thumbnail, homepage, price, pageCount, language} = comics;
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
            <a href={homepage} className="single-comic__back">Back to all</a>
        </>
    )
}

export default SingleComic;