//found this code on net, changed it a little bit...hope it works

import { Box } from '@mui/material';
import axios from '../api/axios';
import { useEffect, useState } from 'react';

const getLog = () => {
  const INITIAL_WAIT = 3000;
  const INTERVAL_WAIT = 20000;
  const ONE_SECOND = 1000;

  const events = ['mouseup', 'keydown', 'scroll', 'mousemove'];

  const startTime = Date.now();
  const endTime = startTime + INITIAL_WAIT;

  const [totalTime, setTotalTime] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [linkCount, setLinkCount] = useState(0);
  const [buttonClicks, setButtonClicks] = useState({ total: 0 });
  const [buttonClickCount, setButtonClickCount] = useState(0);
  const [keypressCount, setKeyPressCount] = useState(0);
  const [scrollCount, setScrollCount] = useState(0);
  const [mouseMovement, setMouseMovement] = useState(0);

  const logUserData = async () => {
    try {
      await axios.post('/auth/log', { totalTime, clickCount, buttonClicks, keypressCount, scrollCount, mouseMovement }, { headers: { Authorization: `Bearer $(localStorage.getItem('accessToken))` } });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    logUserData();
  }, []);

  setInterval(() => {
    if (!document.hidden && startTime <= endTime) {
      startTime = Date.now();
      totalTime += ONE_SECOND;
    }
  }, ONE_SECOND);

  document.addEventListener('DOMContentLoaded', () => {
    events.forEach((e) => {
      document.addEventListener(e, () => {
        endTime = Date.now() + INTERVAL_WAIT;
        if (e === 'mouseup') {
          setClickCount((prevState) => prevState + 1);
          //display click count
          if (event.target.nodeName === 'BUTTON') {
            if (!buttonClicks[event.target.innerText]) {
              buttonClicks[event.target.innerText] = 0;
            }
            buttonClicks[event.target.innerText] += 1;
            buttonClicks.total += 1;
            setButtonClicks(JSON.stringify(buttonClicks, null, 2));
          } else if (event.target.nodeName === 'A') {
            setLinkCount((prevState) => prevState + 1);
          }
        } else if (e === 'keydown') {
          setKeyPressCount((prevState) => prevState + 1);
          //display keyPressCount
        } else if (e === 'scroll') {
          setScrollCount((prevState) => prevState + 1);
          //display scrollCount
        } else if (e === 'mousemove') {
          setMouseMovement((prevState) => prevState + 1);
          //display mouseMovement
        }
      });
    });
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid black' }}>
      <Box sx={{ m: 2 }}>
        <Typography variant="body1">Key Press</Typography>
        {keypressCount}
      </Box>
      <Box sx={{ m: 2 }}>
        <Typography variant="body1"> Scroll Count</Typography>
        {scrollCount}
      </Box>

      <Box sx={{ m: 2 }}>
        <Typography variant="body1"> Mouse Movement</Typography>
        Mouse Movement {mouseMovement}
      </Box>

      <Box sx={{ m: 2 }}>
        <Typography variant="body1"> Click Count</Typography>
        Click Count {clickCount}
      </Box>

      <Box sx={{ m: 2 }}>
        <Typography variant="body1"> Button Clicks</Typography>
        Button Clicks {buttonClicks}
      </Box>
    </Box>
  );
};

export default getLog;
