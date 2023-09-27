import React, { useEffect } from 'react';

export default function DocumentHeader({title, children}) {

    useEffect(() => {
        document.title = title || 'AVS';
    }, [title]);

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);

    return (
        <React.Fragment>
            { children }
        </React.Fragment>
    )
}