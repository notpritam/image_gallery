import React from 'react'
import './header.css'
import { useState, useEffect } from 'react'
import { createApi } from 'unsplash-js'
import { debounce } from 'lodash'

const unsplash = createApi({
    accessKey: 'UcXHv7WpOgJbm6CFgd2bxcwVvXx57Hn7OMEM_4W5Isw'
});
function Header() {

    const [phrase, setPhrase] = useState('');
    const [images, setImages] = useState('');

    function getUnsplashImages(query, page = 1) {
        return new Promise((resolve, reject) => {
            unsplash.search.getPhotos({
                query,
                page,
                perPage: 5,
            }).then(result => {
                resolve(result.response.results.map(result => result.urls.regular));
            }

            )
        })
    }
    useEffect(
        () => {
            if (phrase !== '') {
                debounce(() => {
                    getUnsplashImages(phrase, 1).then(images => setImages(images));
                }, 1000)();
            }
        }, [phrase]
    );

    return (
        <div>
            <input type='text' value={phrase} onChange={e => setPhrase(e.target.value)} />

            {images.length > 0 && images.map(url => (
                <img src={url} />
            ))}

        </div>
    )
}

export default Header