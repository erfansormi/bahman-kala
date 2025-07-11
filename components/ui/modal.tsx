import React, { ReactNode } from "react";
import View from "./view";
import Text from "./text";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Modal as RNModal, TouchableNativeFeedback, ScrollView } from "react-native";

interface Props {
  title?: string;
  open: boolean;
  children: ReactNode;
  hasScrollView?: boolean;
  description?: ReactNode | string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ open, setOpen, children, title, hasScrollView = true, description }: Props) => {
  return (
    <RNModal animationType="fade" transparent visible={open} onRequestClose={() => setOpen(false)}>
      <View className="flex-1 justify-end w-full">
        <View
          style={{ width: "100%" }}
          className="rounded-t-2xl border border-gray-300 bg-white px-4 pb-5"
        >
          <Container hasScrollView={hasScrollView}>
            {/* HEADER */}
            {title && (
              <View className="mb-5 flex-row items-center justify-between border-b border-b-gray-200 py-5">
                <View>
                  <Text style={{ fontSize: 15, marginBottom: 6 }}>{title}</Text>
                  {description && typeof description === "string" ? (
                    <Text size="sm" className="text-gray-500">
                      {description}
                    </Text>
                  ) : (
                    description
                  )}
                </View>
                <TouchableNativeFeedback
                  onPress={() => setOpen(false)}
                  background={TouchableNativeFeedback.Ripple("#e0e0e0", false)}
                >
                  <View>
                    <Ionicons name="close-outline" size={26} color="#333" />
                  </View>
                </TouchableNativeFeedback>
              </View>
            )}

            {/* BODY */}
            {children}
          </Container>
        </View>

        {/* BLACK BACKGROUND TO CLOSE MODAL */}
        <Pressable
          onPress={() => setOpen(false)}
          className="absolute -z-10 h-screen w-screen"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
        />
      </View>
    </RNModal>
  );
};

export default Modal;

const Container = ({
  children,
  hasScrollView,
}: {
  children: React.ReactNode;
  hasScrollView?: boolean;
}) => {
  if (hasScrollView) {
    return <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>;
  }
  return <React.Fragment>{children}</React.Fragment>;
};
