import React from 'react';
import { Container, Grid } from '@mui/material';
import VideoCard from './VideoCard';

const videos = [
  { id: 1, title: 'Nature Documentary', thumbnail: 'https://via.placeholder.com/300' },
  { id: 2, title: 'Tech Talk', thumbnail: 'https://via.placeholder.com/300' },
  { id: 3, title: 'Travel Vlog', thumbnail: 'https://via.placeholder.com/300' },
];

const VideoList = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video.id}>
            <VideoCard title={video.title} thumbnail={video.thumbnail} onPlay={() => alert(`Playing ${video.title}`)} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default VideoList;
