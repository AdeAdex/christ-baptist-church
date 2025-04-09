'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MinistryHeader from './MinistryHeader';
import { ministriesData } from '@/app/data/ministriesData';
import MinistryCard from './MinistryCard';
import MinistryFrame from '@/public/images/MinistryFrame.png';

const OurMinistries = () => {
  const [visibleMinistries, setVisibleMinistries] = useState(0); // Start with the first 5 ministries
  const [isAtTop, setIsAtTop] = useState(true); // Track if we are at the top or bottom
  const [transitionKey, setTransitionKey] = useState(0); // Key to trigger re-animation

  const handleSwipe = () => {
    // When swipe is up, show next 5 ministries, else show previous 5
    if (isAtTop) {
      if (visibleMinistries + 5 < ministriesData.length) {
        setVisibleMinistries(visibleMinistries + 5); // Show next 5 ministries
      }
      if (visibleMinistries + 5 >= ministriesData.length) {
        setIsAtTop(false); // Switch to Swipe Down when the last set is reached
      }
    } else {
      if (visibleMinistries - 5 >= 0) {
        setVisibleMinistries(visibleMinistries - 5); // Show previous 5 ministries
      }
      if (visibleMinistries - 5 <= 0) {
        setIsAtTop(true); // Switch to Swipe Up when the first set is reached
      }
    }

    // Update the transition key to force a re-animation on each button click
    setTransitionKey((prevKey) => prevKey + 1);
  };

  return (
    <div
      className="flex flex-col items-center justify-center py-10 gap-12 px-4 sm:px-8 md:px-16 bg-cover bg-center"
      style={{ backgroundImage: `url(${MinistryFrame.src})` }} // Apply the background image
    >
      <MinistryHeader
        title="Our Ministries"
        className="font-[900] text-[24px] text-center text-white"
      />

      <div className="w-full overflow-hidden">
        {/* Display Ministries with Smooth Swipe and Fade Animation */}
        <motion.div
          key={transitionKey} // Key to trigger re-animation on each click
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 30 }} // Start with opacity 0 and slightly lower position
          animate={{ opacity: 1, y: 0 }} // Animate to full opacity and correct position
          exit={{ opacity: 0, y: -30 }} // Fade out and move upwards when exiting
          transition={{
            opacity: { duration: 0.6, ease: 'easeInOut' }, // Smooth fade in/out with ease
            y: { type: 'spring', stiffness: 300, damping: 25 }, // Smooth vertical slide with spring
          }}
        >
          {ministriesData
            .slice(visibleMinistries, visibleMinistries + 5)
            .map((ministry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }} // Fade in with vertical slide
                animate={{ opacity: 1, y: 0 }} // Smooth fade in with slide
                exit={{ opacity: 0, y: -30 }} // Fade out with slide up
                transition={{
                  opacity: { duration: 0.6, ease: 'easeInOut' }, // Fading duration and easing
                  y: { delay: index * 0.1, type: 'spring', stiffness: 300, damping: 25 }, // Delay each card’s animation slightly
                }}
              >
                <MinistryCard
                  title={ministry.title}
                  content={ministry.content}
                />
              </motion.div>
            ))}
        </motion.div>

        {/* Single Swipe Button */}
        <div className="mt-6 flex justify-center w-full">
          <button
            onClick={handleSwipe}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300"
            disabled={false} // Always enable the button as long as swipe actions are available
          >
            {isAtTop ? 'Swipe Up' : 'Swipe Down'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurMinistries;
