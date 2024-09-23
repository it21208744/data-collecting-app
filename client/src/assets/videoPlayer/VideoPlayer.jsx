import React, { useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'
import thumbnail from '../thumbnail.jpg'
import play from '../play.png'

const VideoPlayer = ({ url }) => {
  const webcamRef = useRef(null) // Reference for the webcam video element

  useEffect(() => {
    const getWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        })
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream // Set the webcam stream to the video element
          webcamRef.current.play()
        }
      } catch (error) {
        console.error('Error accessing webcam: ', error)
      }
    }

    getWebcam()
  }, []) // Empty dependency array ensures this runs once on component mount

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <video
        ref={webcamRef}
        autoPlay
        width={320}
        height={240}
        style={{ marginBottom: '20px' }}
      />
      <ReactPlayer
        url={url}
        controls={true}
        width={1280}
        height={720}
        light={thumbnail}
      />
    </div>
  )
}

export default VideoPlayer
