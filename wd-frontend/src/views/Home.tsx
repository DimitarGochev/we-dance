import { useContext, useEffect, useState } from "react";
import { Post } from "../models/Post";
import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { PostsClientService } from "../services/posts-service";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import AddPost from "../widgets/AddPost";
import PostCard from "../widgets/PostCard";
import { CommentsClientService } from "../services/comments-service";
import { UserContext } from "../App";
import { IdType } from "../common-types";
import { Comment } from "../models/Comment";

const Home = () => {
    const { loggedUser, setLoggedUser } = useContext(UserContext);
    const [posts, setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        updatePosts();
    }, []);

    const updatePosts = () => {
        PostsClientService.findAll().then(posts => setPosts(posts)).catch((error) => console.log(error));
    };

    const editPost = (postId: IdType) => {
        navigate('/posts/' + postId);
    };

    const deletePost = (postId: IdType) => {
        PostsClientService.deleteById(postId)
            .then(() => setPosts(oldPosts => oldPosts.filter(post => post.id !== postId)))
            .catch((error) => console.log(error));
    };

    const saveComment = (comment: string, postId: IdType) => {
        CommentsClientService.create({text: comment, postedBy: loggedUser.id, postId, createdAt: new Date()})
        .then(comm =>  updatePosts())
        .catch((error) => console.log(error));
    };

    const deleteComment = (commentId: IdType) => {
        CommentsClientService.deleteById(commentId).then(() => updatePosts()).catch((error) => console.log(error));
    };

    return (
        <Box sx={{ width: '100%', minHeight: 'calc(100vh - 128px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AddPost onPostAdded={() => updatePosts()}/>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {posts.map(post => (<PostCard key={post.id} post={post} 
                onComment={async (comment,  postId) => saveComment(comment, postId)}
                onDeleteComment={async (commentId) => deleteComment(commentId)}
                onEditPost={async (postId) => editPost(postId)}
                onDeletePost={async (postId) => deletePost(postId)}
                />))}
            </List>
        </Box>
    );
};

export default Home;