import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/> ;
        case 'confirmed':
            return <Component/>;
        case 'error': 
            return <ErrorMessage/>;
        default:
            throw new Error ('Unexpected process state');
    } 
}


const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
   
    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList])
        setNewItemLoading(newItemLoading => false)
        setOffset(offset => offset + 8)
        setComicsEnded(comicsEnded => ended)
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'ojectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'ojectFit' : 'contain'};
            }

            return (
                <li className="comics__item" key={i}>
                            <Link to={`/comics/${item.id}`}>
                                <img style = {imgStyle} src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                                <div className="comics__item-name">{item.title}</div>
                                <div className="comics__item-price">{item.price}</div>
                            </Link>
                        </li>
                
            )
        });

        return (
                <ul className="comics__grid">
                        {items}
                </ul>
        )
    }

    return (
            <div className="comics__list">
                {setContent(process, () => renderItems(comicsList), newItemLoading)}
                <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': comicsEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}
                    >
                    <div className="inner">load more</div>
                </button>
            </div>
    )

    
};

export default ComicsList;