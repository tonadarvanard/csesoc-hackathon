"use client";

import { useRef, useState } from "react";
export default function Record() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaStreamTrack | null>(
    null
  );
  const [Recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    const recorder = new MediaRecorder(stream);

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }

    setRecorder(recorder);
    setMediaRecorder(stream.getVideoTracks()[0]);
    const recordedChunks: Blob[] = [];
    recorder.ondataavailable = (e) => {
      console.log("a");
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      sendVideo(blob);
      //const url = URL.createObjectURL(blob);

      // const a = document.createElement("a");
      // a.style.display = "none";
      // a.href = url;
      // a.download = "blob.mp4";
      // document.body.appendChild(a);
      // a.click();

      setIsRecording(false);
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
    };

    recorder.start();
  };

  const stopRecording = () => {
    Recorder?.stop();
  };

  const sendVideo = async (videoBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append("video", videoBlob, "recorded-video.webm");
      // const response = await fetch("/api/upload_video", {
      //   method: "POST",
      //   body: formData,
      // });
      // if (response.ok) {
      //   console.log("Video uploaded successfully!");
      // } else {
      //   console.error("Failed to upload video:", response.statusText);
      // }
      // if (videoRef.current) {
      //   videoRef.current.src = url;
      // }
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const handleStartStopClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <video
        ref={videoRef}
        width="640"
        height="480"
        className="bg-[#D9D9D9] border-2 border-colour-[#D9D9D9] drop-shadow-lg"
      ></video>
      <button
        onClick={handleStartStopClick}
        className="bg-white rounded p-2 text-black transition duration-300 transform hover:bg-[#B2B2B2] "
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
}
