import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import dbService from '../appwrite/db';
import storageService from '../appwrite/storage';
import { Button, Container } from '../components';
import parse from "html-react-parser";

function Post() {
    const [post, setPost] = useState(null);
    const {slug} = useParams(); 
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);

    useEffect( async() => {
        if(slug){
            const post = await dbService.getPost(slug);
            setPost(post);
        }else{
            navigate("/");
        }
    }, [slug])

    let isAuthor;
    if(post && userData){
        isAuthor = post.userId === userData.$id;
    }
    const deletePost = async () => {
        const deletedPost = await dbService.deletePost(post.$id);
        if(deletedPost && deletedPost.featuredImage){ 
            await storageService.deleteFile(deletedPost.featuredImage);
            navigate("/");
        }
    }
    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img 
                        src={storageService.getFilePreview(post.featuredImage)} 
                        alt={post.title}
                        className="rounded-xl" 
                    />
                    {isAuthor && (
                        <div className="absolute-right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button 
                                    text="Edit"
                                    bgColor="bg-green-500"
                                    className="mr-3"
                                />
                            </Link>
                            <Button 
                                    text="Delete"
                                    bgColor="bg-red-500"
                                    onClick={deletePost}
                            />
                        </div>
                    ) }
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">
                        {post.title}
                    </h1>
                    <div className="browser-css">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null 
}

export default Post;