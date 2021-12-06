/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({Component, dataType}) => {
        const {id} = useParams();
        const [data, setData] = useState(null);
        const {getComics, getCharacter, clearError, process, setProcess} = useMarvelService();

        useEffect(() => {
            updateData()
        }, [id])

        const updateData = () => {
            clearError();

            // eslint-disable-next-line default-case
            switch (dataType) {
                case 'comic':
                    getComics(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                // eslint-disable-next-line no-fallthrough
                case 'character':
                    getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'));
            }
        }

        const onDataLoaded = (data) => {
            setData(data);
        }

    
        return (
                <>
                    <AppBanner/>
                    {setContent (process, Component, data)}
                </>
        )
}

export default SinglePage;

