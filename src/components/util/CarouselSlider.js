import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

export default function CarouselSlider({slidesToShow, children}) {

    const settings = {
        className: 'slider variable-width',
        dots: true,
        infinite: true,
        centerMode: false,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToShow,
        variableWidth: true,
        autoplay: false,
    }

    return (
        <Slider {...settings}>
            {children}
        </Slider>
    )
}