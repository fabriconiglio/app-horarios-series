import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import moment from 'moment';

const SeriesCarousel = () => {
    const [series, setSeries] = useState([]);

    useEffect(() => {
        const fetchSeriesAndIntervals = async () => {
            try {

                const seriesResponse = await axios.get('http://localhost:3001/api/series');
                const seriesData = seriesResponse.data;

                const seriesWithIntervalsPromises = seriesData.map(async (serie) => {
                    const intervalsResponse = await axios.get(`http://localhost:3001/api/intervals/by-series/${serie.id}`);
                    return { ...serie, intervals: intervalsResponse.data };
                });

                const seriesWithIntervals = await Promise.all(seriesWithIntervalsPromises);

                setSeries(seriesWithIntervals);
            } catch (error) {
                console.error('Error fetching series and intervals:', error);
            }
        };

        fetchSeriesAndIntervals();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 400,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="carousel-container">
            <span><img src="/images/logo%20de%20televisor.png" alt="Abstract representation of TV series" width="100"/></span>
            <h2>Series</h2>
            {series.length > 0 ? (
                <Slider {...settings}>
                {series.map((serie) => (
                    <div key={serie.id} className="series-card">
                        <h3>{serie.title}</h3>
                        <p><strong>Channel:</strong> {serie.channel}</p>
                        <p><strong>Gender:</strong> {serie.gender}</p>
                        {serie.intervals && serie.intervals.length > 0 ? (
                            serie.intervals.map((interval, index) => (
                                <div key={index} className="series-interval">
                                    <p>Day: {interval.week_day}</p>
                                    <p>Time: {moment(interval.show_time, 'HH:mm:ss').format('h:mm A')}</p>
                                </div>
                            ))
                        ) : (
                            <div className="series-interval upcoming">
                                <p>Próximamente en nuestras plataformas</p>
                            </div>
                        )}
                    </div>
                ))}
            </Slider>
            ) : (
                <div className="alert alert-info">
                    Estamos actualizando nuestro catálogo de series. ¡Pronto aparecerán nuevas!
                </div>
            )}
        </div>
    );
};

export default SeriesCarousel;
