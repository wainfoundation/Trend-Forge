import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView, Alert } from "react-native";
import { useRouter, Stack } from "expo-router";
import { ArrowLeft, Check } from "lucide-react-native";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import useAuth from "@/hooks/useAuth";
import usePiAuth from "@/hooks/usePiAuth";

type SubscriptionPlan = {
  id: "digital" | "premium" | "all-access" | "lifetime";
  name: string;
  price: number;
  isOneTime?: boolean;
  isPopular?: boolean;
  features: string[];
};

const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "digital",
    name: "Digital",
    price: 6,
    features: [
      "Unlimited access to trendforge.com",
      "Daily newsletters",
      "Mobile app access"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: 9,
    isPopular: true,
    features: [
      "All Digital plan benefits",
      "Exclusive premium content",
      "Ad-free experience",
      "Access to archives"
    ]
  },
  {
    id: "all-access",
    name: "All-Access",
    price: 12,
    features: [
      "All Premium plan benefits",
      "Digital print edition",
      "Priority support",
      "Exclusive webinars"
    ]
  },
  {
    id: "lifetime",
    name: "Lifetime Access",
    price: 99,
    isOneTime: true,
    features: [
      "All All-Access benefits",
      "Lifetime access without renewals",
      "Exclusive member badge",
      "Priority event invitations"
    ]
  }
];

export default function SubscribeScreen() {
  const router = useRouter();
  const { subscribe, isAuthenticated } = useAuth();
  const { makeSubscriptionPayment, isPiAvailable, isProcessingPayment } = usePiAuth();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(SUBSCRIPTION_PLANS[1]); // Premium as default

  const handleSubscribe = () => {
    if (!isAuthenticated) {
      Alert.alert(
        "Sign In Required",
        "Please sign in to subscribe",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Sign In",
            onPress: () => router.push("/login"),
          },
        ]
      );
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      subscribe();
      setIsProcessing(false);
      Alert.alert(
        "Subscription Successful",
        `Thank you for subscribing to Trend Forge ${selectedPlan.name}!`,
        [
          {
            text: "OK",
            onPress: () => router.push("/"),
          },
        ]
      );
    }, 1500);
  };

  const handlePiPayment = async () => {
    if (!isAuthenticated) {
      Alert.alert(
        "Sign In Required",
        "Please sign in to subscribe",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Sign In",
            onPress: () => router.push("/login"),
          },
        ]
      );
      return;
    }

    const success = await makeSubscriptionPayment(
      selectedPlan.price, 
      `${selectedPlan.name} subscription for Trend Forge`,
      { 
        subscriptionPlan: selectedPlan.id,
        isOneTime: selectedPlan.isOneTime || false
      }
    );
    
    if (success) {
      router.push("/");
    }
  };

  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Subscribe",
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <ArrowLeft size={24} color={Colors.light.text} />
            </Pressable>
          ),
        }}
      />

      <ScrollView>
        <View style={styles.header}>
          <Text style={Typography.h1}>Choose Your Subscription Plan</Text>
          <Text style={styles.subtitle}>
            Unlock global insights with a Trend Forge subscription, payable in Pi Network (PI) cryptocurrency.
          </Text>
        </View>

        <View style={styles.plansContainer}>
          {SUBSCRIPTION_PLANS.map((plan) => (
            <Pressable
              key={plan.id}
              style={[
                styles.planCard,
                selectedPlan.id === plan.id && styles.selectedPlan,
                plan.isPopular && styles.popularPlan,
              ]}
              onPress={() => setSelectedPlan(plan)}
            >
              {plan.isPopular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>Most Popular</Text>
                </View>
              )}
              <Text style={styles.planName}>{plan.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{plan.price} PI</Text>
                <Text style={styles.period}>
                  {plan.isOneTime ? "/one-time" : "/month"}
                </Text>
              </View>
              <View style={styles.featuresContainer}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Check size={16} color={Colors.light.tint} style={styles.checkIcon} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.paymentOptions}>
          <Pressable
            style={[styles.subscribeButton, isProcessing && styles.buttonDisabled]}
            onPress={handleSubscribe}
            disabled={isProcessing}
            android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
          >
            <Text style={styles.subscribeButtonText}>
              {isProcessing ? "Processing..." : `Subscribe for ${selectedPlan.price} PI`}
            </Text>
          </Pressable>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <Pressable
            style={[styles.piButton, isProcessingPayment && styles.buttonDisabled]}
            onPress={handlePiPayment}
            disabled={isProcessingPayment}
            android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
          >
            <Text style={styles.piButtonText}>
              {isProcessingPayment ? "Processing..." : `Pay with Pi (${selectedPlan.price}π)`}
            </Text>
          </Pressable>
        </View>

        <View style={styles.faqContainer}>
          <Text style={[Typography.h2, styles.faqTitle]}>Frequently Asked Questions</Text>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>What is included in a Trend Forge subscription?</Text>
            <Text style={styles.faqAnswer}>
              Plans include access to articles, newsletters, premium content, ad-free browsing, archives, digital print editions, webinars, and priority support, depending on the tier.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>How do I pay with Pi Network (PI)?</Text>
            <Text style={styles.faqAnswer}>
              Subscriptions are payable via your Pi Network wallet. After selecting a plan, you'll authenticate and confirm the payment in the Pi app. Payments are processed securely on the Pi Network.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>What is the USD equivalent of PI prices?</Text>
            <Text style={styles.faqAnswer}>
              Based on recent estimates (~$0.60/PI), Digital is ~$3.60/month, Premium is ~$5.40/month, All-Access is ~$7.20/month, and Lifetime is ~$59.40 one-time. Prices are fixed in PI, so USD equivalents may vary with PI's market value.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Can I cancel my subscription?</Text>
            <Text style={styles.faqAnswer}>
              Monthly plans can be canceled anytime via your account. Lifetime Access is a one-time payment with no recurring fees. Contact support for assistance.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Is the Lifetime Access plan transferable?</Text>
            <Text style={styles.faqAnswer}>
              Lifetime Access is tied to your account and non-transferable. It provides perpetual access to all Trend Forge content and benefits.
            </Text>
          </View>
        </View>

        <Text style={styles.termsText}>
          By subscribing, you agree to our Terms of Service and Privacy Policy. You can cancel your subscription at any time.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  backButton: {
    padding: 8,
  },
  header: {
    padding: 16,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
  plansContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  planCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
    position: "relative",
  },
  selectedPlan: {
    borderColor: Colors.light.tint,
    backgroundColor: "rgba(227, 18, 11, 0.05)",
    borderWidth: 2,
  },
  popularPlan: {
    borderColor: Colors.light.tint,
    borderWidth: 2,
  },
  popularBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomLeftRadius: 8,
  },
  popularBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  planName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.tint,
  },
  period: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  featuresContainer: {
    marginTop: 8,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkIcon: {
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    color: Colors.light.text,
    flex: 1,
  },
  paymentOptions: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  subscribeButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  subscribeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.light.border,
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#666",
  },
  piButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  piButtonText: {
    color: Colors.light.text,
    fontWeight: "bold",
    fontSize: 16,
  },
  faqContainer: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 16,
  },
  faqTitle: {
    marginBottom: 16,
  },
  faqItem: {
    marginBottom: 16,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  termsText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginHorizontal: 16,
    marginBottom: 32,
  },
});
