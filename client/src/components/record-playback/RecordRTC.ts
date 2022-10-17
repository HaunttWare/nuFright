import { useState, useEffect } from "react";
import RecordRTC, { RecordRTCPromisesHandler } from "recordrtc";
export const useRecorderPermission = (
  recordingType: RecordRTC.Options["type"]
) => {
  const [recorder, setRecorder] = useState<any>();
  useEffect(() => {
    getPermissionInitializeRecorder();
  }, []);
  const getPermissionInitializeRecorder = async () => {
    let stream = await (navigator as any).mediaDevices.getUserMedia({
      audio: true,
      // video: true if we ever want access to users webcam permissions
    });
    let recorder = new RecordRTCPromisesHandler(stream, {
      type: recordingType,
    });
    setRecorder(recorder);
  };
  return recorder;
};