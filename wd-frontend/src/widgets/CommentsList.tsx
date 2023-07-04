import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Comment } from "../models/Comment";
import { User } from "../models/User";
import { IdType } from "../common-types";

interface Props {
    comments: Comment[],
    user: User,
    onCommentDeleteCallback: (commentId: IdType) => {}
}

const CommentsList = ({ comments, user, onCommentDeleteCallback }: Props) => {

    return (<Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* <Typography variant='h6' textAlign={'center'} mt={'20px'}>Comments:</Typography> */}
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {comments.length > 0 ? comments.map(comment => (
                <ListItem alignItems="flex-start"
                    key={comment.id}
                    secondaryAction={
                       ((comment.postedBy as User).id === user.id || user.role === 'admin') && <>
                            {/* <Link to={`/CommentsList/${comment.id}`}>
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                            </Link> */}
                            <IconButton onClick={() => onCommentDeleteCallback(comment.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </>
                    }>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={(comment.postedBy as User).avatar} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={(comment.postedBy as User).firstName + ' ' + (comment.postedBy as User).lastName}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {/* {'Author: ' + (comment.author || 'unknown')} */}
                                </Typography>
                                {comment.text && <Typography
                                    sx={{ display: 'block' }}
                                    component="span"
                                    variant="body2"
                                >
                                    {comment.text}</Typography>}
                            </React.Fragment>
                        }
                    />
                </ListItem>)) : 'No comments yet'}

        </List>
    </Box>
    )
};

export default CommentsList;
