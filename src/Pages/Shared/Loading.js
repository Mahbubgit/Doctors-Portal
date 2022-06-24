import React from 'react';

const Loading = () => {
    return (
        <div className='flex justify-center items-center'>
            <div className="w-24 h-24 border-l-2 border-gray-900 rounded-full animate-spin"></div>
            {/* <div className="w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div> */}
            {/* <button className="btn loading">loading</button> */}
        </div>
    );
};

export default Loading;