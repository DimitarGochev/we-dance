import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Post } from '../models/Post';
import { InputAdornment, Menu, MenuItem, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CommentsList from './CommentsList';
import { Comment } from '../models/Comment';
import { User } from '../models/User';
import { IdType } from '../common-types';
import { UserContext } from '../App';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface CardProps {
  post: Post;
  onComment: (comment: string, postId: IdType) => {},
  onDeleteComment: (commentId: IdType) => {},
  onEditPost: (postId: IdType) => {},
  onDeletePost: (postId: IdType) => {}
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostCard = ({ post, onComment, onDeleteComment, onEditPost, onDeletePost }: CardProps) => {
  const { loggedUser, setLoggedUser } = React.useContext(UserContext);
  const [expanded, setExpanded] = React.useState(false);
  const [comment, setComment] = React.useState('');

  const allCardSettins = [{ name: 'Edit' }, { name: 'Delete' }];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [cardSettings, setCardSettings] = React.useState(allCardSettins);
  const [showCardSettings, setShowCardSettings] = React.useState<boolean>(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCardSettings = (setting: string) => {
    setAnchorEl(null);
    if (setting === 'Edit') {
      onEditPost(post.id);
    } else if (setting === 'Delete') {
      onDeletePost(post.id);
    }
  };

  React.useEffect(() => {
    if (loggedUser.id !== (post.postedBy as User).id && loggedUser.role !== 'admin') {
      setShowCardSettings(false);
    }
  }, [loggedUser]);

  return (
    <Card sx={{ maxWidth: 345, mt: '20px' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} src={(post.postedBy as User).avatar}></Avatar>
        }
        action={
          showCardSettings && <>
          <IconButton aria-label="settings" onClick={(event) => setAnchorEl(event.currentTarget)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        {cardSettings.map(cardSetting => 
                        <MenuItem key={cardSetting.name} onClick={() => handleCardSettings(cardSetting.name)}>{cardSetting.name}</MenuItem>)}
                    </Menu>
          </>
        }
        title={(post.postedBy as User).firstName + ' ' + (post.postedBy as User).lastName}
        subheader={new Date(post.createdAt).toDateString()}
      />
      <CardMedia
        component="img"
        height="194"
        image={post.imageUrl}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <TextField value={comment} onChange={(event) => setComment(event.target.value)} label="Add comment" variant="standard" sx={{
            width: '100%',
            mb: '10px'
          }}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton onClick={() => { onComment(comment, post.id); setComment('')}}>
                  <CheckIcon />
                </IconButton>
              </InputAdornment>
            }} />
          <Typography paragraph>Comments:</Typography>
          <CommentsList comments={post.comments as Comment[]} userId={loggedUser.id} onCommentDeleteCallback={(id) => onDeleteComment(id)} />
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default PostCard;