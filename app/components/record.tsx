"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Record() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setInterval(captureFrame, 500);
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };
    startVideo();
  }, []);

  const captureFrame = async () => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const frame = canvas.toDataURL("image/jpeg");

    try {
      //   const response = await fetch("/api/process_video", {
      //     method: "POST",
      //     body: frame,
      //     headers: {
      //       "Content-Type": "application/octet-stream",
      //     },
      //   });
      //   const result = await response.json();
      //   console.log(result);
      console.log(frame);
    } catch (error) {
      console.error("Error processing video:", error);
    }
  };

  return (
    <div>
      <video ref={videoRef} width="640" height="480"></video>
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ display: "none" }}
      ></canvas>
      <Link href="/progress/create" className="bg-white text-black">
        Done!
      </Link>
    </div>
  );
}
