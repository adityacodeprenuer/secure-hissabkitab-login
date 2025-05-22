
export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  profileImage: string;
}

// Separate interface for password update
export interface PasswordUpdate {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
