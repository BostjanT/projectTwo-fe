import { Box, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Distance, ImageBox, ImageIcons, Lock } from '../style/CardStyled';
import { LockOutlined as LockIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

export type Location = {
  id: string;
  image: string;
  distance?: number;
  imageLocked?: boolean;
  imageGuessed?: boolean;
  imageIsMine?: boolean;
  addBackgroundGradient?: boolean;
  centerChildren?: boolean;
  showPointerOnHover?: boolean;
  onClick?: () => void;
};

export const LocationCard = (props: Location) => {
  const navigate = useNavigate();
  const { id, image, distance, imageLocked, imageGuessed, imageIsMine } = props;
  return (
    <Card>
      <ImageBox
        sx={{
          background: `${!imageIsMine && (imageLocked || imageGuessed) ? 'linear-gradient(90deg, rgba(102, 159, 137, 0.6) 50%, rgba(159, 193, 129, 0.6) 128%), ' : ''} url('${
            image ? image : '../images/Cards/Piran.jpg'
          }')  no-repeat`,
          backgroundSize: 'cover',
          height: 235
        }}
        onClick={() => {
          !imageLocked && !imageIsMine ? navigate(`/guess/${id}`) : null;
        }}>
        <Box>
          {imageIsMine ? (
            <ImageIcons>
              <IconButton aria-label="delete" sx={{}}>
                <EditIcon
                  sx={{
                    width: '40px',
                    height: '40px',
                    padding: '8px',
                    background: '#9B6161',
                    color: '#fff',
                    borderRadius: '4px'
                  }}
                  onClick={() => navigate(`/edit/${id}`)}
                />
              </IconButton>
              <IconButton color="secondary">
                <ClearIcon
                  sx={{
                    width: '40px',
                    height: '40px',
                    padding: '8px',
                    background: '#619B8A',
                    color: '#fff',
                    borderRadius: '4px'
                  }}
                  onClick={() => navigate(`/${id}`)}
                />
              </IconButton>
            </ImageIcons>
          ) : imageLocked || !imageIsMine ? (
            <Lock>
              <LockIcon
                sx={{
                  fontSize: '3rem',
                  color: 'white'
                }}
              />
            </Lock>
          ) : imageGuessed && !imageLocked ? (
            <Box>
              <Distance>{`${distance} m`}</Distance>
            </Box>
          ) : (
            ''
          )}
        </Box>
      </ImageBox>
    </Card>
  );
};
