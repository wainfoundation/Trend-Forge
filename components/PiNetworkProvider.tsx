import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { usePiNetwork } from '@/utils/piNetwork';

// HTML content with Pi SDK
const PI_SDK_HTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Pi Network Bridge</title>
  <script src="https://sdk.minepi.com/pi-sdk.js"></script>
  <script>
    // Initialize Pi SDK
    Pi.init({ version: "2.0", sandbox: true });
    
    // Notify React Native that SDK is ready
    window.addEventListener('load', function() {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'SDK_READY'
      }));
    });
  </script>
</head>
<body>
  <div id="pi-sdk-bridge">Pi Network SDK Bridge</div>
</body>
</html>
`;

export default function PiNetworkProvider({ children }: { children: React.ReactNode }) {
  const webviewRef = useRef<WebView>(null);
  const { initialize, messageHandlers } = usePiNetwork();
  
  useEffect(() => {
    if (webviewRef.current) {
      initialize(webviewRef);
    }
  }, [initialize]);
  
  // Handle messages from WebView
  const handleMessage = (event: WebViewMessageEvent) => {
    // Forward the message to all registered handlers
    messageHandlers.forEach(handler => handler(event));
    
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log('Message from Pi SDK Bridge:', data);
    } catch (error) {
      console.error('Error parsing message from Pi SDK Bridge:', error);
    }
  };
  
  return (
    <>
      {Platform.OS !== 'web' && (
        <View style={styles.webviewContainer}>
          <WebView
            ref={webviewRef}
            originWhitelist={['*']}
            source={{ html: PI_SDK_HTML }}
            onMessage={handleMessage}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            style={styles.webview}
          />
        </View>
      )}
      {children}
    </>
  );
}

const styles = StyleSheet.create({
  webviewContainer: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  webview: {
    width: 1,
    height: 1,
  },
});
