import React, { useEffect, useState } from 'react'
import { Container, PostCard, SkeletonGrid } from '../components'
import dbService from '../appwrite/db';


function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        dbService.getPosts().then((posts) => {
            if(posts)  setPosts(posts.documents);
        }).finally(() => setLoading(false));
    }, [loading]);

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <SkeletonGrid count={8}/>
                </Container>
            </div>
        )
    }

    if(posts.length === 0){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No Posts uploaded yet.  
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