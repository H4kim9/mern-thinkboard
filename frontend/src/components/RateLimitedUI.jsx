import React from 'react'
import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-3xl px-2 py-4 mx-auto">
      <div className="border rounded-lg shadow-md bg-primary/30 border-primary/30">
        <div className="flex flex-row items-center p-4">
          <div className="flex-shrink-0 p-4 mb-4 rounded-full bg-primary/20 md:mb-0 md:mr-6">
            <ZapIcon className="size-8 text-primary" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="mb-2 text-lg font-bold">Rate Limit Reached</h3>
            <p className="text-base-content">
              You've made too many requests in a short period. Please wait a moment.
            </p>
            <p className="text-sm text-base-content/70">
              Try again in a few seconds for the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI



