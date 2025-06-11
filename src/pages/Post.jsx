import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import dbService from '../appwrite/db';
import storageService from '../appwrite/storage';
import { Button, Container } from '../components';
import parse from "html-react-parser";

function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams(); 
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    let isAuthor;
    let isDraft;

    const fetchPost = useCallback(async () => {
        if (slug) {
            const fetchedPost = await dbService.getPost(slug);
            if (fetchedPost) setPost(fetchedPost);
            else navigate("/");
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    if(post && userData){
        isAuthor = post.userId === userData.$id;
        isDraft = post.status === "draft";
    }
    const deletePost = async () => {
        if(window.confirm("Are you sure you want to delete this post?")){
            const deletedFile = post ? await storageService.deleteFile(post.featuredImage) : undefined;
            const deletedPost = post ? await dbService.deletePost(post.$id) : undefined;
            if(deletedPost && deletedFile){ 
                navigate("/my-profile");
            }
        }
    }

    const publishPost = async () => {
        const publishedPost = await dbService.updatePost(post.$id, {
            status: "published",
        });
        if(publishedPost){
            navigate(`/post/${publishedPost.$id}`)
        }
    }

    useEffect( () => {
        fetchPost();
    }, [fetchPost, publishPost, slug, navigate]);
    
    return post ? (
        <div className="py-10">
            <Container>
                <div className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-300 mb-6">
                    <div className="relative">
                        <img 
                            src={storageService.getFilePreview(post.featuredImage)} 
                            alt={post.title}
                            className="w-full max-h-[400px] object-cover object-center" 
                        />
                        {isAuthor && (
                            <div className="absolute top-4 right-4 flex gap-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button 
                                        text="Edit"
                                        bgColor="bg-green-500"
                                        className="px-4 py-2 text-sm"
                                    />
                                </Link>
                                <Button 
                                        text="Delete"
                                        bgColor="bg-red-500"
                                        className="px-4 py-2 text-sm"
                                        onClick={deletePost}
                                />
                                {isDraft && (
                                    <Button 
                                        text="Publish"
                                        bgColor="bg-blue-500"
                                        className="px-4 py-2 text-sm"
                                        onClick={publishPost}
                                    />
                                )}
                            </div>
                        ) }
                    </div>
                    <div className="p-6">
                        <h1 className="text-4xl font-extrabold mb-6 text-gray-800 leading-tight border-b pb-2">
                            {post.title}
                        </h1>
                        <div className="prose prose-lg max-w-none browser-css">
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null 
}

export default Post;