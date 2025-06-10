import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import dbService from '../appwrite/db';
import { Container, PostForm } from '../components';

function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(async () => {
        if(slug){
            const post = await dbService.getPost(slug);
            if(post) setPost(post);
            else navigate("/");
        }
    }, [slug, navigate])
  return (
    <div className="py-6">
        <Container>
            <PostForm 
                post={post}
            />
        </Container>
    </div>
  )
}

export default EditPost;