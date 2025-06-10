import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import dbService from '../appwrite/db';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        dbService.getPosts().then((posts) => {
            if(posts)  setPosts(posts.documents);
        });
    }, [])
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

export default AllPosts;