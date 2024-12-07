import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    container: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90svh', width: '100svw', flexDirection: 'column' },
    message: {fontSize: '1.5rem', fontWeight: 500, color:'grey', fontFamily: 'sans-serif'},
    imageAlt: { color:'grey'},
    imageBox: { background: 'whitesmoke', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '225px' },
    mainContainer: { padding: '2rem', boxShadow: '0 0 10px lightgrey', height: '70vh', width: '60vw' }
})

function EventDetail() {
    const styles = useStyles();
    // const [params] = useSearchParams();
    // const id = params.get('id');
    const {id} = useParams();
    const [eventData, setEventData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    async function fetchData() {
        try {
            const response = await axios.get(`https://www.eventbriteapi.com/v3/events/${id}/`, {
                headers: {
                    Authorization: 'Bearer W5HK74QVWJYSUK2OXRTO',
                },
            });

            setEventData(response.data);
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <div className={styles.container}>
        <p className={styles.message}>Loading event details...</p>
    </div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.container}>
            <h1>Event Details</h1>
            <Box className={styles.mainContainer}>
                {eventData ? (
                    <div>
                        <div className={styles.imageBox}>
                            <h1 className={styles.imageAlt}>Image 2 X 10</h1>
                        </div>
                        <h2>{eventData.name?.text}</h2>
                        <p>{eventData.description?.text}</p>
                        <p>
                            <strong>Start:</strong> {eventData.start?.local}
                        </p>
                        <p>
                            <strong>End:</strong> {eventData.end?.local}
                        </p>
                    </div>
                ) : (
                    <div className={styles.container}>
                        <p className={styles.message}>No event details available.</p>
                    </div>
                )}
            </Box>
        </div>
    );
}

export default EventDetail;
