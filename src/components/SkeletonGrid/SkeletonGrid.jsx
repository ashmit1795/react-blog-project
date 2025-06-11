import PostCardSkeleton from "../PostCardSkeleton/PostCardSkeleton";

function SkeletonGrid({ count = 8 }) {
    return (
        <div className="flex flex-wrap">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                    <PostCardSkeleton />
                </div>
            ))}
        </div>
    );
}

export default SkeletonGrid;
