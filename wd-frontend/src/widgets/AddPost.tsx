import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../App";
import { PostsClientService } from "../services/posts-service";

interface Props {
    onPostAdded: () => void;
}

const AddPost = ({ onPostAdded }: Props) => {
    const { loggedUser, setLoggedUser } = useContext(UserContext);
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (formData: any) => {
        formData.postedBy = loggedUser.id;
        PostsClientService.create(formData).then(() => { onPostAdded(); reset(); }).catch((error) => console.log(error));
    };

    return (
        <Box component={'form'} onSubmit={handleSubmit(onSubmit)} autoComplete='off' sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: "20px",
            alignItems: 'center',
            width: "50vw",
            minHeight: "100px",
            border: "2px solid black",
            borderRadius: "20px",
            padding: "20px"
        }}>
            <Typography variant="h5" textAlign={'center'}>Add new post</Typography>
            <TextField
                {...register("description", { required: true })}
                multiline
                rows={2}
                sx={{
                    width: "100%"
                }}
                placeholder="What is on your mind?"
            />
            <TextField
                {...register("imageUrl", { required: true })}
                sx={{
                    width: "100%"
                }}
                placeholder="Add image URL"
            />
            <Button type='submit' variant="contained" sx={{
                width: "50%"
            }}>Post</Button>
        </Box>
    )
};

export default AddPost;