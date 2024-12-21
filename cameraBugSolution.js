```javascript
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />; // Or a loading indicator
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        let photo = await cameraRef.current.takePictureAsync();
        console.log('Photo taken:', photo);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              padding: 10,
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: 5,
            }}
            onPress={() => takePicture()}>
            <Text style={{ color: '#fff' }}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default CameraScreen;
```