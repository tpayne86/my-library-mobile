import React from 'react';
import {CameraScreen} from 'react-native-camera-kit';

interface BarcodeReaderProps {
  verifyISBN: (str: String) => void;
}

const BarcodeReader = ({verifyISBN}: BarcodeReaderProps) => (
  <CameraScreen
    scanBarcode={true}
    onReadCode={event => {
      verifyISBN(event.nativeEvent.codeStringValue);
    }}
  />
);
export default BarcodeReader;
