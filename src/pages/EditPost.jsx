import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import dbService from '../appwrite/db';
import { Container, PostForm } from '../components';
import { useSelector } from 'react-redux';

function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    let isAuthor;

    useEffect(() => {
        if(slug){
            dbService.getPost(slug).then((fetchedPost) => {
                if(fetchedPost){
                    setPost(fetchedPost);
                } else {
                    navigate("/");
                }

                if(fetchedPost && userData) isAuthor = fetchedPost.userId === userData.$id;

                if(!isAuthor) navigate(`/post/${slug}`);
            });
        }
    }, [slug, navigate]);



    return post ? (
        <div className="py-6">
            <Container>
                <PostForm 
                    post={post}
                />
            </Container>
        </div>
    ) : null
}

export default EditPost;