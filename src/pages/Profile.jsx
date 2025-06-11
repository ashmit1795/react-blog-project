import React, { useEffect, useState } from 'react'
import { Container, PostCard, SkeletonGrid } from '../components'
import dbService from '../appwrite/db';
import { useSelector } from 'react-redux';

function Profile() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);
    const userId = userData?.$id;

    useEffect(() => {
        dbService.getUserPosts(userId).then((posts) => {
            if(posts)  setPosts(posts.documents);
        }).finally(() => setLoading(false));
    }, [loading, userData]);

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <SkeletonGrid count={8}/>
                </Container>
            </div>
        )
    }


    return (
        <div className="w-full py-8">
            <Container>
                {/* Profile Info */}
                <div className="mb-8 p-4 border rounded-lg bg-white shadow">
                    <h2 className="text-2xl font-bold mb-2">Your Profile</h2>
                    <p><span className="font-semibold">Name:</span> {userData?.name}</p>
                    <p><span className="font-semibold">Email:</span> {userData?.email}</p>
                    <p><span className="font-semibold">User ID:</span> {userData?.$id}</p>
                </div>

                {/* Posts */}
                <h2 className="text-xl font-semibold mb-4">Your Posts</h2>

                {loading ? (
                    <SkeletonGrid count={8} />
                ) : posts.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">
                        You have not uploaded any posts.
                    </div>
                ) : (
                    <div className="flex flex-wrap -m-2">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                                <PostCard {...post} showStatus={true} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}

export default Profile;