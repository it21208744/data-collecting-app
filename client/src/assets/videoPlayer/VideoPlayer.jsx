import React from 'react'
import ReactPlayer from 'react-player'

const VideoPlayer = ({ url }) => {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      const videoElement = document.querySelector('video')
      videoElement.srcObject = stream
      videoElement.play()
    })
    .catch((error) => console.error('Error accessing webcam: ', error))

  return (
    <div>
      <ReactPlayer url={url} controls={true} width={1280} height={720} />
    </div>
  )
}

export default VideoPlayer
