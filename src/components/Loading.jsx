import React from 'react';
import "../styles/loadingStyle.css"

const Loading = () => {
    return (
        <div className='overlay'>
        <div className="lds-facebook">
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
        </div>
        </div>
    );
};

export default Loading;