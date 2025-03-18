
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfile } from "@/types/auth";
import { motion } from "framer-motion";

interface ProfileAvatarProps {
  profile: UserProfile | null;
  size?: "sm" | "md" | "lg";
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ profile, size = "md" }) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-20 w-20",
  };

  const getFallbackText = () => {
    if (!profile) return "?";
    if (profile.full_name) {
      return profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }
    if (profile.username) {
      return profile.username.substring(0, 2).toUpperCase();
    }
    return profile.email?.substring(0, 2).toUpperCase() || "?";
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
      <Avatar className={sizeClasses[size]}>
        {profile?.avatar_url ? (
          <AvatarImage src={profile.avatar_url} alt={profile.full_name || "User"} />
        ) : null}
        <AvatarFallback className="bg-primary text-primary-foreground">
          {getFallbackText()}
        </AvatarFallback>
      </Avatar>
    </motion.div>
  );
};

export default ProfileAvatar;
