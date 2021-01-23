import React from "react";

export const start = (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="fast-backward"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    classname="svg-inline--fa fa-fast-backward fa-w-16"
  >
    <path
      fill="currentColor"
      d="M0 436V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v151.9L235.5 71.4C256.1 54.3 288 68.6 288 96v131.9L459.5 71.4C480.1 54.3 512 68.6 512 96v320c0 27.4-31.9 41.7-52.5 24.6L288 285.3V416c0 27.4-31.9 41.7-52.5 24.6L64 285.3V436c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12z"
    ></path>
  </svg>
);

export const decrement = (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="backward"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    classname="svg-inline--fa fa-backward fa-w-16"
  >
    <path
      fill="currentColor"
      d="M11.5 280.6l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2zm256 0l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2z"
    ></path>
  </svg>
);

export const increment = (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="forward"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    classname="svg-inline--fa fa-forward fa-w-16"
  >
    <path
      fill="currentColor"
      d="M500.5 231.4l-192-160C287.9 54.3 256 68.6 256 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2zm-256 0l-192-160C31.9 54.3 0 68.6 0 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2z"
    ></path>
  </svg>
);

export const end = (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="fast-forward"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    classname="svg-inline--fa fa-fast-forward fa-w-16"
  >
    <path
      fill="currentColor"
      d="M512 76v360c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V284.1L276.5 440.6c-20.6 17.2-52.5 2.8-52.5-24.6V284.1L52.5 440.6C31.9 457.8 0 443.4 0 416V96c0-27.4 31.9-41.7 52.5-24.6L224 226.8V96c0-27.4 31.9-41.7 52.5-24.6L448 226.8V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12z"
    ></path>
  </svg>
);

export const random = (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="question"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    classname="svg-inline--fa fa-question fa-w-12"
  >
    <path
      fill="currentColor"
      d="M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148 25.049-31.381 43.63-49.449 82.757-49.449 30.764 0 68.816 19.799 68.816 49.631 0 22.552-18.617 34.134-48.993 51.164-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271 0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271-31.075-69.27-69.271-69.27z"
    ></path>
  </svg>
);

export const generateGrade = () => {
  let grade = Math.floor(Math.random() * 7) + 1;
  return grade;
};

export const buttonsArray = [1, 2, 3, 4, 5, 6, 8];
