function PostCardSkeleton() {
    return (
        <div className="animate-pulse p-2 rounded-lg border border-gray-200 bg-white">
            <div className="h-40 w-full bg-gray-300 rounded-md mb-2"></div>
            <div className="h-4 w-3/4 bg-gray-300 rounded mb-1"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        </div>
    )
}

export default PostCardSkeleton;