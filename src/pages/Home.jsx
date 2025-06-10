import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import dbService from '../appwrite/db';
import { useSelector } from 'react-redux';


function Home() {
    const [posts, setPosts] = useState([]);
    console.log(useSelector((state) => state.auth.status))
    useEffect(() => {
        dbService.getPosts().then((posts) => {
            if(posts)  setPosts(posts.documents);
        });
    }, []);

    if(posts.length === 0){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }


    return (
        <div className="w-full py-8">
                <Container>
                    <div className="flex flex-wrap">
                        {posts && posts.map((post) => (
                            <div className="p-2 w-1/4" key={post.$id}>
                                <PostCard 
                                    title={post.title} 
                                    featuredImage={post.featuredImage}
                                    $id={post.$id}
                                />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
    )
}

export default Home;