import { Platform } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { create } from 'zustand';

// Types for Pi Network SDK
export interface PiUser {
  username: string;
  uid?: string;
  accessToken?: string;
}

export interface PiPaymentData {
  amount: number;
  memo: string;
  metadata?: Record<string, any>;
}

export interface PiPaymentCallbacks {
  onReadyForServerApproval: (paymentId: string) => void;
  onReadyForServerCompletion: (paymentId: string, txid: string) => void;
  onCancel: () => void;
  onError: (error: Error, payment?: any) => void;
}

export interface PiNetworkState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: PiUser | null;
  webviewRef: React.RefObject<WebView> | null;
  messageHandlers: Array<(event: WebViewMessageEvent) => void>;
  
  // Methods
  initialize: (webviewRef: React.RefObject<WebView>) => void;
  authenticate: () => Promise<PiUser>;
  makePayment: (paymentData: PiPaymentData, callbacks: PiPaymentCallbacks) => Promise<void>;
  addMessageHandler: (handler: (event: WebViewMessageEvent) => void) => void;
  removeMessageHandler: (handler: (event: WebViewMessageEvent) => void) => void;
}

// Store for Pi Network state
export const usePiNetwork = create<PiNetworkState>((set, get) => ({
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  webviewRef: null,
  messageHandlers: [],
  
  initialize: (webviewRef) => {
    set({ webviewRef, isInitialized: true });
  },
  
  addMessageHandler: (handler) => {
    set(state => ({
      messageHandlers: [...state.messageHandlers, handler]
    }));
  },
  
  removeMessageHandler: (handler) => {
    set(state => ({
      messageHandlers: state.messageHandlers.filter(h => h !== handler)
    }));
  },
  
  authenticate: async () => {
    const { webviewRef, isInitialized, addMessageHandler } = get();
    
    if (!isInitialized || !webviewRef?.current) {
      throw new Error('Pi Network SDK not initialized');
    }
    
    return new Promise<PiUser>((resolve, reject) => {
      // Execute authentication in WebView
      webviewRef.current?.injectJavaScript(`
        (async () => {
          try {
            const scopes = ['payments', 'username'];
            const auth = await Pi.authenticate(scopes, (payment) => {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'INCOMPLETE_PAYMENT',
                payment
              }));
            });
            
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'AUTHENTICATION_SUCCESS',
              user: {
                username: auth.user.username,
                uid: auth.user.uid,
                accessToken: auth.accessToken
              }
            }));
          } catch (error) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'AUTHENTICATION_ERROR',
              error: error.message
            }));
          }
        })();
        true;
      `);
      
      // Create message handler
      const messageHandler = (event: WebViewMessageEvent) => {
        try {
          const data = JSON.parse(event.nativeEvent.data);
          
          if (data.type === 'AUTHENTICATION_SUCCESS') {
            set({ isAuthenticated: true, user: data.user });
            removeMessageHandler(messageHandler);
            resolve(data.user);
          } else if (data.type === 'AUTHENTICATION_ERROR') {
            removeMessageHandler(messageHandler);
            reject(new Error(data.error));
          }
        } catch (error) {
          removeMessageHandler(messageHandler);
          reject(error);
        }
      };
      
      // Add the message handler
      const removeMessageHandler = addMessageHandler(messageHandler);
    });
  },
  
  makePayment: async (paymentData, callbacks) => {
    const { webviewRef, isInitialized, isAuthenticated, addMessageHandler } = get();
    
    if (!isInitialized || !webviewRef?.current) {
      throw new Error('Pi Network SDK not initialized');
    }
    
    if (!isAuthenticated) {
      throw new Error('User not authenticated');
    }
    
    // Execute payment in WebView
    webviewRef.current?.injectJavaScript(`
      (async () => {
        try {
          const payment = await Pi.createPayment(
            ${JSON.stringify(paymentData)},
            {
              onReadyForServerApproval: (paymentId) => {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'PAYMENT_READY_FOR_APPROVAL',
                  paymentId
                }));
              },
              onReadyForServerCompletion: (paymentId, txid) => {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'PAYMENT_READY_FOR_COMPLETION',
                  paymentId,
                  txid
                }));
              },
              onCancel: () => {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'PAYMENT_CANCELLED'
                }));
              },
              onError: (error, payment) => {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'PAYMENT_ERROR',
                  error: error.message,
                  payment
                }));
              }
            }
          );
        } catch (error) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'PAYMENT_ERROR',
            error: error.message
          }));
        }
      })();
      true;
    `);
    
    // Create message handler
    const messageHandler = (event: WebViewMessageEvent) => {
      try {
        const data = JSON.parse(event.nativeEvent.data);
        
        switch (data.type) {
          case 'PAYMENT_READY_FOR_APPROVAL':
            callbacks.onReadyForServerApproval(data.paymentId);
            break;
          case 'PAYMENT_READY_FOR_COMPLETION':
            callbacks.onReadyForServerCompletion(data.paymentId, data.txid);
            removeMessageHandler(messageHandler);
            break;
          case 'PAYMENT_CANCELLED':
            callbacks.onCancel();
            removeMessageHandler(messageHandler);
            break;
          case 'PAYMENT_ERROR':
            callbacks.onError(new Error(data.error), data.payment);
            removeMessageHandler(messageHandler);
            break;
        }
      } catch (error) {
        callbacks.onError(error as Error);
        removeMessageHandler(messageHandler);
      }
    };
    
    // Add the message handler
    const removeMessageHandler = addMessageHandler(messageHandler);
  }
}));

// Helper to check if Pi Browser is available
export const isPiBrowserAvailable = (): boolean => {
  if (Platform.OS === 'web') {
    return typeof window !== 'undefined' && 'Pi' in window;
  }
  
  // For mobile, we can't directly check
  // In a real app, you might use a deep link check or other detection method
  return false;
};
