import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostsClientService } from "../services/posts-service";
import { Post } from "../models/Post";

const EditPost = () => {
    const [currentPost, setCurrentPost] = useState<Post>();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (post: any) => {
        PostsClientService.update({...currentPost, ...post}).then((res: any) => navigate('/home')).catch((error) => console.log(error));
    }

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id)
            PostsClientService.findById(id).then((post: Post) => setCurrentPost(post)).catch(error => console.log(error));
    }, [id]);

    return (
        <Box sx={{ minHeight: 'calc(100vh - 128px)' }}>
            {(currentPost && <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                placeContent: 'center',
                alignItems: 'center',
                gap: '10px',
                width: 500,
                minWidth: 300,
                height: 'fit-content',
                backgroundColor: 'white',
                boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.42)',
                borderRadius: '10px',
                padding: '20px',
                mt: '20px',
                mb: '20px'
            }}>
                <Typography variant='h4' mb={'20px'}>Edit post</Typography>
                <Box component={'form'} onSubmit={handleSubmit(onSubmit)} autoComplete='off' style={{
                    display: 'flex',
                    flexDirection: 'column',
                    placeContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                }}>
                    <TextField {...register("description", { required: true })} defaultValue={currentPost.description} label="Description" variant="outlined" />
                    {errors.description && <span>This field is required</span>}
                    <TextField {...register("imageUrl", { required: true })} defaultValue={currentPost.imageUrl} label="Image URL" variant="outlined" />
                    {errors.imageUrl && <span>This field is required</span>}

                    <Button type='submit' variant="outlined" sx={{ width: '100%' }}>Save</Button>
                </Box>
            </Box>)}
        </Box>
    )

};

export default EditPost;