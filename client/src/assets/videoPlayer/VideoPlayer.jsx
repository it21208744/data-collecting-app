import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import thumbnail from '../thumbnail.jpg'
import play from '../play.png'

const VideoPlayer = ({ url }) => {
  const webcamRef = useRef(null) // Reference for the webcam video element
  const mediaRecorderRef = useRef(null) // Reference for media recorder
  const [recording, setRecording] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState([])

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

  const startRecording = () => {
    setRecording(true)
    const stream = webcamRef.current.srcObject // Get the webcam stream
    const mediaRecorder = new MediaRecorder(stream) // Create a MediaRecorder instance
    mediaRecorderRef.current = mediaRecorder // Store the media recorder reference

    // Push data (blobs) to chunks when data is available
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data])
      }
    }

    // Start recording
    mediaRecorder.start()
  }

  const stopRecording = () => {
    setRecording(false)
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop() // Stop recording
    }
  }

  const downloadRecording = () => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      document.body.appendChild(a)
      a.style = 'display: none'
      a.href = url
      a.download = 'webcam-recording.webm'
      a.click()
      window.URL.revokeObjectURL(url)
      setRecordedChunks([]) // Clear the chunks after download
    }
  }

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

      <button onClick={startRecording} disabled={recording}>
        Start Test
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        End Test
      </button>
      <button
        onClick={downloadRecording}
        disabled={recordedChunks.length === 0}
      >
        Download Recording
      </button>
    </div>
  )
}

export default VideoPlayer
