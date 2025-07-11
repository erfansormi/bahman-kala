import React from "react";
import View from "@/components/ui/view";
import Modal from "@/components/ui/modal";
import Button from "@/components/ui/button";
import * as SecureStore from "expo-secure-store";
import { useUserTokenStore } from "@/store/user-token";
import { useToast } from "react-native-toast-notifications";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutModal = ({ open, setOpen }: Props) => {
  const toast = useToast();
  const setToken = useUserTokenStore((state) => state.setToken);

  const logout = async () => {
    await SecureStore.deleteItemAsync("token").then(() => {
      toast.show("خروج با موفقیت انجام شد");
      setToken(null);
      setOpen(false);
    });
  };

  return (
    <Modal open={open} setOpen={setOpen} title="آیا واقعا میخواهید خارج شوید؟">
      <View className="flex-row" style={{ gap: 10, marginTop: 20 }}>
        <Button onPress={logout} style={{ width: "48%" }} fontSizes="sm" size="base">
          بله مطمئنم
        </Button>
        <Button
          size="base"
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
