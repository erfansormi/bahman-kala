import React from "react";
import { View } from "react-native";
import Modal from "@/components/ui/modal";
import Button from "@/components/ui/button";
import * as SecureStore from "expo-secure-store";
import { useToast } from "react-native-toast-notifications";
import { router } from "expo-router";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutModal = ({ open, setOpen }: Props) => {
  const toast = useToast();

  const logout = async () => {
    await SecureStore.deleteItemAsync("token").then(() => {
      toast.show("خروج با موفقیت انجام شد");
      setOpen(false);
      router.navigate("/auth/login");
    });
  };

  return (
    <Modal open={open} setOpen={setOpen} title="آیا واقعا میخواهید خارج شوید؟">
      <View className="flex-row" style={{ gap: 10, marginTop: 20 }}>
        <Button onPress={logout} style={{ width: "48%" }} fontSizes="sm" size="sm">
          بله مطمئنم
        </Button>
        <Button
          size="sm"
          fontSizes="sm"
          variant="outline"
          style={{ width: "48%" }}
          onPress={() => setOpen(false)}
        >
          انصراف
        </Button>
      </View>
    </Modal>
  );
};

export default LogoutModal;
