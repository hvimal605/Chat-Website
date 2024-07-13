import React from 'react';

const BubbleAnimation = () => {
  return (
    <div id="center-div" className="absolute top-0 right-0 bottom-0 left-0 m-auto w-14 h-14">
      <div className="relative">
        <div className="bubble absolute cursor-pointer">
          <span className="bubble-outer-dot">
            <span className="bubble-inner-dot"></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BubbleAnimation;
