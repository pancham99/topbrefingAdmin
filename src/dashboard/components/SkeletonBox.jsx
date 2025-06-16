const SkeletonBox = () => {
    return (
        <div className='grid lg:grid-cols-5 lg:gap-x-4 gap-4 lg:gap-0 space-y-2'>
            {[...Array(5)].map((_, index) => (
                <div
                    key={index}
                    className='relative overflow-hidden bg-white border border-gray-300 rounded-md h-40 w-40 flex justify-center items-center'
                >
                    <div className='absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer'></div>
                    <div className='z-10 text-gray-400'>------</div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonBox;
