import React from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { LogOut, CreditCard, Settings, Bell, BookOpen, Lock } from "lucide-react-native";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import useAuth from "@/hooks/useAuth";
import usePiAuth from "@/hooks/usePiAuth";
import LoginPrompt from "@/components/LoginPrompt";

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
  color?: string;
}

export default function ProfileScreen() {
  const router = useRouter();
  const { isAuthenticated, username, isSubscribed, signOut } = useAuth();
  const { authenticateWithPi } = usePiAuth();

  const handleLogin = () => {
    router.push("/login");
  };

  const handlePiLogin = async () => {
    await authenticateWithPi();
  };

  const handleSubscribe = () => {
    router.push("/subscribe");
  };

  const handleLogout = () => {
    signOut();
  };

  const MenuItem = ({ icon, title, onPress, color = Colors.light.text }: MenuItemProps) => (
    <Pressable
      style={styles.menuItem}
      onPress={onPress}
      android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
    >
      {icon}
      <Text style={[styles.menuItemText, { color }]}>{title}</Text>
    </Pressable>
  );

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={Typography.h1}>Profile</Text>
        </View>
        <LoginPrompt 
          message="Sign in to access your profile and subscription" 
          onDismiss={() => {}}
        />
        <View style={styles.piLoginContainer}>
          <Pressable
            style={styles.piLoginButton}
            onPress={handlePiLogin}
            android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
          >
            <Text style={styles.piLoginText}>Sign in with Pi Network</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={Typography.h1}>Profile</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{username?.[0].toUpperCase()}</Text>
            </View>
            <View>
              <Text style={styles.username}>{username}</Text>
              <Text style={styles.subscriptionStatus}>
                {isSubscribed ? "Premium Subscriber" : "Free Account"}
              </Text>
            </View>
          </View>

          {!isSubscribed && (
            <Pressable
              style={styles.subscribeButton}
              onPress={handleSubscribe}
              android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
            >
              <Text style={styles.subscribeButtonText}>Upgrade to Premium</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.menuContainer}>
            <MenuItem
              icon={<BookOpen size={20} color={Colors.light.text} style={styles.menuIcon} />}
              title="Reading History"
              onPress={() => router.push("/reading-history")}
            />
            <MenuItem
              icon={<Bell size={20} color={Colors.light.text} style={styles.menuIcon} />}
              title="Notifications"
              onPress={() => router.push("/notifications")}
            />
            {isSubscribed && (
              <MenuItem
                icon={<CreditCard size={20} color={Colors.light.text} style={styles.menuIcon} />}
                title="Manage Subscription"
                onPress={() => router.push("/manage-subscription")}
              />
            )}
            <MenuItem
              icon={<Settings size={20} color={Colors.light.text} style={styles.menuIcon} />}
              title="Settings"
              onPress={() => router.push("/settings")}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          <View style={styles.menuContainer}>
            <MenuItem
              icon={<Lock size={20} color={Colors.light.text} style={styles.menuIcon} />}
              title="Privacy Policy"
              onPress={() => router.push("/privacy-policy")}
            />
            <MenuItem
              icon={<Lock size={20} color={Colors.light.text} style={styles.menuIcon} />}
              title="Terms of Service"
              onPress={() => router.push("/terms")}
            />
          </View>
        </View>

        <View style={styles.logoutContainer}>
          <MenuItem
            icon={<LogOut size={20} color={Colors.light.error} style={styles.menuIcon} />}
            title="Log Out"
            onPress={handleLogout}
            color={Colors.light.error}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    padding: 16,
  },
  profileCard: {
    backgroundColor: Colors.light.card,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.light.tint,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  avatarText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  subscriptionStatus: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  subscribeButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  subscribeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginBottom: 8,
    color: Colors.light.text,
  },
  menuContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
  },
  logoutContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 32,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  piLoginContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  piLoginButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  piLoginText: {
    color: Colors.light.text,
    fontWeight: "bold",
    fontSize: 16,
  },
});
