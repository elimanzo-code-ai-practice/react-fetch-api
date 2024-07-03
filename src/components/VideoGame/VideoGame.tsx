import React from 'react';
import {
  Box,
  Card, CardContent, CardMedia, Typography,
} from '@mui/material';


interface Cover {
  id: number;
  url: string;
}

export interface VideoGameProps {
  cover: Cover;
  name: string;
  summary: string;
}

// eslint-disable-next-line react/function-component-definition
const VideoGame: React.FC<VideoGameProps> = ({
  cover, name, summary,
}) => (
  <Box display='flex' justifyContent='center' alignItems='center'>
    <Card style={{ maxWidth: 350 }}>
      {cover != null && (
      <CardMedia
        component='img'
        style={{ height: 'auto', width: 'auto', margin: '0 auto' }}
        image={`https:${cover.url.replace('/t_thumb/', '/t_cover_big/')}`}
        alt={`${name} cover`}
      />
      )}
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Summary:
          {' '}
          {summary}
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

export default VideoGame;
