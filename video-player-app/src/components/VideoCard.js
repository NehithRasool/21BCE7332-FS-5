import React from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { motion } from 'framer-motion';

const VideoCard = ({ title, thumbnail, onPlay }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
        <CardMedia component="img" height="180" image={thumbnail} alt={title} />
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <IconButton onClick={onPlay} color="primary">
            <PlayCircleOutlineIcon />
          </IconButton>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VideoCard;
