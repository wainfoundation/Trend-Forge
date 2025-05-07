import { useEffect, useState, useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import useAuth from './useAuth';
import { usePiNetwork, isPiBrowserAvailable } from '@/utils/piNetwork';

export default function usePiAuth() {
  const { signIn, subscribe } = useAuth();
  const { isInitialized, authenticate, makePayment, addMessageHandler, removeMessageHandler } = usePiNetwork();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  // Check if Pi Browser is available
  const isPiAvailable = isPiBrowserAvailable();
  
  // Authenticate with Pi Network
  const authenticateWithPi = async () => {
    if (!isPiAvailable && Platform.OS === 'web') {
      Alert.alert(
        "Pi Browser Required",
        "Please open this app in the Pi Browser to use Pi Network authentication."
      );
      return;
    }
    
    if (!isInitialized) {
      Alert.alert(
        "Pi Network Not Available",
        "Pi Network SDK is not initialized. Please try again later."
      );
      return;
    }
    
    try {
      setIsAuthenticating(true);
      const user = await authenticate();
      
      // Sign in to our app with Pi username
      signIn(user.username);
      
      return user;
    } catch (error) {
      console.error('Pi authentication error:', error);
      Alert.alert(
        "Authentication Failed",
        "Failed to authenticate with Pi Network. Please try again."
      );
      return null;
    } finally {
      setIsAuthenticating(false);
    }
  };
  
  // Make a payment with Pi
  const makeSubscriptionPayment = async (
    amount = 10, 
    memo = "Trend Forge Premium Subscription",
    metadata: Record<string, any> = { productId: "premium_subscription" }
  ) => {
    if (!isPiAvailable && Platform.OS === 'web') {
      Alert.alert(
        "Pi Browser Required",
        "Please open this app in the Pi Browser to make Pi payments."
      );
      return false;
    }
    
    if (!isInitialized) {
      Alert.alert(
        "Pi Network Not Available",
        "Pi Network SDK is not initialized. Please try again later."
      );
      return false;
    }
    
    try {
      setIsProcessingPayment(true);
      
      // First ensure user is authenticated
      if (!isAuthenticating) {
        await authenticateWithPi();
      }
      
      // Create payment data
      const paymentData = {
        amount,
        memo,
        metadata
      };
      
      // Process payment
      await makePayment(paymentData, {
        onReadyForServerApproval: (paymentId) => {
          console.log('Payment ready for approval:', paymentId);
          // In a real app, you would call your backend to approve the payment
          // For this demo, we'll simulate approval
          setTimeout(() => {
            Alert.alert(
              "Payment Approved",
              "Your payment has been approved and is being processed."
            );
          }, 1000);
        },
        onReadyForServerCompletion: (paymentId, txid) => {
          console.log('Payment ready for completion:', paymentId, txid);
          // In a real app, you would call your backend to complete the payment
          // For this demo, we'll simulate completion
          setTimeout(() => {
            // Activate subscription
            subscribe();
            
            Alert.alert(
              "Payment Successful",
              `Your ${memo} has been activated. Thank you for subscribing to Trend Forge!`
            );
          }, 1000);
        },
        onCancel: () => {
          Alert.alert(
            "Payment Cancelled",
            "You cancelled the payment process. Your subscription has not been activated."
          );
        },
        onError: (error) => {
          console.error('Payment error:', error);
          Alert.alert(
            "Payment Failed",
            "There was an error processing your payment. Please try again later."
          );
        }
      });
      
      return true;
    } catch (error) {
      console.error('Pi payment error:', error);
      Alert.alert(
        "Payment Failed",
        "Failed to process payment with Pi Network. Please try again."
      );
      return false;
    } finally {
      setIsProcessingPayment(false);
    }
  };
  
  return {
    isPiAvailable,
    isAuthenticating,
    isProcessingPayment,
    authenticateWithPi,
    makeSubscriptionPayment
  };
}
