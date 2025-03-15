"use client"

import { ClipLoader } from "react-spinners"

export default function LoadingSpinner() {
  return (
    <div className="container">
      <div className="main-content">
        <div className="loading-spinner">
          <ClipLoader size={50} color="#000" />
          <div className="loading-spinner__text">LOADING...</div>
        </div>
      </div>
    </div>
  )
}