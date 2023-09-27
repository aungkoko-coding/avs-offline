import { Avatar, Box, CardMedia, Chip, Divider, Grid, Typography } from '@mui/material';
import { styled, useTheme, } from '@mui/material/styles'
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import DetailSkeleton from '../components/skeleton/DetailSkeleton';
import ResultNotFound from '../components/error/ResultNotFoundError';
import { client } from '../lib/client';
import { querySeason } from '../lib/queries';
import AsideGenres from '../components/nav/AsideGenres';
import Scenes from '../components/Scenes';
import Tags from '../components/nav/Tags';
import { AppContext } from '../context/AppContextProvider';
import AddToCartButton from '../components/util/AddToCartButton';
import DocumentHeader from '../components/util/DocumentHeader';
import Price from '../components/util/Price';
import WatchTrailerButton from '../components/util/WatchTrailerButton';
import Review from '../components/util/Review';

const StyledDivider = styled((props) => <Divider flexItem {...props} />)(() => ({
    width: 'auto'
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
}));

const StyledSpan = styled("span")(({ theme }) => ({
    color: theme.palette.text.primary
}));

const freshTomatoIconUrl = "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-fresh.149b5e8adc3.svg";
const rottenTomatoUrl = "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/tomatometer/tomatometer-rotten.f1ef4f02ce3.svg"
const freshAudienceScoreIconUrl = "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-fresh.6c24d79faaf.svg";
const rottenAudienceScoreIconUrl = "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-rotten.f419e4046b7.svg"

// WE NEED TO IMPLEMENT 404 ERROR
export default function TVShowDetail(props) {

    const [season, setSeason] = useState(null);
    const [isOnFullScreen, setIsOnFullScreen] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);
    const slug = useParams().slug;
    const theme = useTheme();

    const { title, rating, quality, imdb, country,
        language, runtime, releaseDate, price,
        tomato, audienceScore, genres, posterImgUrl, extraPosterImages
    } = season ?? {};

    const { networkError, closeNetworkError, openNetworkError } = useContext(AppContext);

    useEffect(() => {
        function callback() {
            if(document.fullscreenElement) {
                setIsOnFullScreen(true);
            }else {
                setIsOnFullScreen(false);
            }
        }

        window.addEventListener('fullscreenchange', callback);
        window.addEventListener('webkitfullscreenchange', callback);

        return () => {
            window.removeEventListener('fullscreenchange', callback);
            window.removeEventListener('webkitfullscreenchange', callback);
        }
    }, []);

    useEffect(() => {

        if (slug) {
            client.fetch(querySeason(slug))
                .then(res => {
                    if (networkError) {
                        closeNetworkError();
                    }
                    if (!res) {
                        setIsNotFound(true);
                    }
                    setSeason(res);
                })
                .catch(openNetworkError);
        }

    }, [slug]);

    return (
        <Box sx={{ p: 0.5, mt: 2, }}>
            <DocumentHeader title={`AVS | ${title || 'TV Series Detail'}`} />
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                {/** Photo and details */}
                {
                    season && !isNotFound && (
                        <Grid component="main" container spacing={2} sx={{ p: { xs: 1, md: 3 } }}>
                            {/** Left side ( photo ) */}
                            <Grid item xs={12} sm
                                sx={{
                                    display: 'flex',
                                    justifyContent: { xs: 'center', sm: 'flex-end' },
                                    paddingRight: { xs: 0, sm: '16px' },
                                    pr: 2,
                                    py: 2
                                }}
                            >
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: { xs: 'center', sm: 'flex-end' },
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative'
                                }}>
                                    <CardMedia
                                        component='img'
                                        src={posterImgUrl}
                                        alt={season.title}
                                        loading="lazy"
                                        sx={{
                                            display: 'block',
                                            maxWidth: '150px',
                                            border: `solid 1px ${theme.palette.primary.main}`
                                        }}
                                    />
                                </Box>

                            </Grid>

                            {/** Right side (about details) */}
                            <Grid item xs
                                sx={{
                                    display: 'flex',
                                    alignItems: { xs: 'center', sm: 'flex-start' },
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    rowGap: "5px",
                                    borderLeft: { sm: 'solid 2px red' },
                                    py: 2,
                                }}
                            >
                                <Box>
                                    <Box sx={{
                                        "& > *:not(:last-child)": {
                                            marginRight: "7px",
                                        },
                                        "& > *": {
                                            borderRadius: '7px',
                                            padding: '4px 6px',
                                        }
                                    }}>
                                       {rating && <Chip label={rating} size="small" color="error" />}
                                        <Chip label={quality || "720p"} size="small" color="info" />
                                        <Price price={price} />
                                    </Box>
                                    <StyledTypography variant="subtitle1" sx={{ mt: 1 }}>
                                        Title: <StyledSpan> {title}</StyledSpan>
                                    </StyledTypography>
                                    <StyledDivider />
                                    <StyledTypography variant="subtitle1">
                                        IMDb: {" "}
                                        <StyledSpan sx={{ color: (theme) => imdb > 5 ? theme.palette.success.main : theme.palette.error.main }}>
                                            {imdb}
                                        </StyledSpan>
                                    </StyledTypography>
                                    <StyledDivider />
                                    <StyledTypography variant="subtitle1">
                                        Country: <StyledSpan>{country}</StyledSpan>
                                    </StyledTypography>
                                    <StyledDivider />
                                    <StyledTypography variant="subtitle1">
                                        Language: <StyledSpan>{language}</StyledSpan>
                                    </StyledTypography>
                                    <StyledDivider />
                                    <StyledTypography variant="subtitle1">
                                        Runtime: <StyledSpan>{runtime}</StyledSpan>
                                    </StyledTypography>
                                    <StyledDivider />
                                    <StyledTypography variant="subtitle1">
                                        Release Date: <StyledSpan>{releaseDate}</StyledSpan>
                                    </StyledTypography>
                                    <StyledDivider />
                                    <StyledTypography
                                        variant="subtitle1"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            columnGap: '5px'
                                        }}
                                    >
                                        <Avatar
                                            src={tomato >= 60 ? freshTomatoIconUrl : rottenTomatoUrl}
                                            alt="Tomato meter"
                                            sx={{ width: 25, height: 25 }}
                                        >
                                            Tomato
                                        </Avatar>
                                        <StyledSpan sx={{ color: (theme) => tomato >= 60 ? theme.palette.success.main : theme.palette.error.main }}>
                                            {tomato}%
                                        </StyledSpan>
                                    </StyledTypography>
                                    <StyledDivider />
                                    <StyledTypography
                                        variant="subtitle1"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            columnGap: '5px'
                                        }}
                                    >
                                        <Avatar
                                            src={audienceScore >= 60 ? freshAudienceScoreIconUrl : rottenAudienceScoreIconUrl}
                                            alt="Audience score"
                                            sx={{ width: 25, height: 25 }}
                                        >
                                            Audience score
                                        </Avatar>
                                        <StyledSpan sx={{ color: (theme) => audienceScore >= 60 ? theme.palette.success.main : theme.palette.error.main }}>
                                            {audienceScore}%
                                        </StyledSpan>
                                    </StyledTypography>
                                    <StyledDivider />
                                    <StyledTypography variant="subtitle1">
                                        Genre: <StyledSpan>{genres?.join(", ")}</StyledSpan>
                                    </StyledTypography>
                                </Box>
                            </Grid>
                        </Grid>)
                }
                {
                    !season && !isNotFound && <DetailSkeleton />
                }
                {
                    isNotFound && <ResultNotFound message="TV Series not found!" />
                }
                {
                    season && !isNotFound &&
                    <Grid container justifyContent='center' gap={0.5} mb={1} display={{ sm: isOnFullScreen ? 'flex' : 'none' }}>
                        <AddToCartButton item={season} />
                        <WatchTrailerButton trailerUrlIDs={season.trailerUrlIDs} />
                    </Grid>
                }
                {
                    season && season.review &&
                    <Review message={season.review} mt={2} display={{ sm: 'none' }} />
                }

                {/** Aside */}
                <AsideGenres />
            </Box>

            {
                season && !isNotFound &&
                <Grid container justifyContent='center' gap={0.5} mt={2} display={{ xs: isOnFullScreen ? 'flex' : 'none', sm: 'flex' }}>
                    <AddToCartButton item={season} />
                    <WatchTrailerButton trailerUrlIDs={season.trailerUrlIDs} />
                </Grid>
            }

            {
                season && season.review &&
                <Review message={season.review} mt={2} display={{ xs: 'none', sm: 'block' }} />
            }

            <Scenes scenes={extraPosterImages} />

            <Divider sx={{mt: 2}} />
            <Tags my={2} />
        </Box>
    );
}