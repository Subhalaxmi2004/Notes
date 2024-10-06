"use client";
import React from 'react';
import Heading from './_component/Heading';
import Heroes from './_component/Heroes';
import Footer from './_component/Footer';
const Marketing = () => {
  return (
    <>
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col justify-center items-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
        <Heroes/>
        <Footer/>
      </div>
    </div>
    </>
  );
};

export default Marketing;



