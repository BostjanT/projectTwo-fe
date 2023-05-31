import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export type LeaderboardGuess = {
  user: string;
  userLeader: number;
  distance: string;
  image: string;
  timeVoted: string;
  userMe: boolean;
};

const Leaderboard = (props: LeaderboardGuess) => {
  const { user, userLeader, distance, image, timeVoted, userMe } = props;
  return (
    <>
      <List sx={{ width: '420px', bgcolor: `${userMe ? '#619B8A' : 'white'}` }}>
        <ListItem alignItems="flex-start">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: '16px',
              gap: '16px',
              width: '27px',
              height: '27px',
              backgroundColor: `${
                userLeader === 1
                  ? 'linear-gradient(41.75deg, #FE7F2D 22.78%, #FCCA46 87.18%)'
                  : userLeader === 2
                  ? 'linear-gradient(41.75deg, #D8D8D8 22.78%, #999999 87.18%)'
                  : userLeader === 3
                  ? 'linear-gradient(41.75deg, #956956 22.78%, #D79376 87.18%'
                  : '#233D4D'
              }`
            }}>
            {userLeader}
          </Box>
          <ListItemAvatar>
            <Avatar alt="users avatar" sx={{ width: '40px', height: '40px', borderRadius: '50%' }} src={image} />
          </ListItemAvatar>
          <ListItemText
            primary={user}
            secondary={
              <React.Fragment>
                <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="secondary">
                  {'1.1.2023'}
                </Typography>
                {timeVoted}
              </React.Fragment>
            }
          />
          <Typography variant="body1" sx={{ display: 'flex', alignSelf: 'center' }}>
            {distance} m
          </Typography>
        </ListItem>
      </List>
    </>
  );
};
export default Leaderboard;
