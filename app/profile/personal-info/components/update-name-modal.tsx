import React, { useRef, useState } from "react";

import { TextInput, TouchableNativeFeedback, View } from "react-native";
import Modal from "@/components/ui/modal";
import Text from "@/components/ui/text";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateNameData, updateNameSchema } from "@/utils/schemas";
import { editName } from "@/services/profile";
import { useToast } from "react-native-toast-notifications";
import { useUserStore } from "@/store/user-store";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateNameModal = ({ open, setOpen }: Props) => {
  const toast = useToast();
  const lastNameRef = useRef<TextInput>(null);
  const { setUser, user } = useUserStore();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState } = useForm<UpdateNameData>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: { first_name: user?.first_name, last_name: user?.last_name },
  });

  const onSubmit = (data: UpdateNameData) => {
    setLoading(true);
    editName(data)
      .then((res) => {
        setUser({
          ...user!,
          first_name: data.first_name,
          last_name: data.last_name,
        });
        setOpen(false);
        toast.show("نام و نام خانوادگی با موفقیت تغییر کرد", {
          type: "success",
        });
      })
      .catch((err) => {
        toast.show("خطا در تغییر نام", {
          type: "danger",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal open={open} setOpen={setOpen} title="ثبت اطلاعات هویتی">
      {/* DES */}
      <View>
        <View>
          <Text fontFamily="vazirLight" size="sm">
            لطفا اطلاعات شناسایی خود را وارد کنید.
          </Text>
          <Text fontFamily="vazirLight" size="sm">
            نام و نام خانوادگی شما باید با اطلاعاتی که وارد می کنید مطابقت داشته باشد.
          </Text>
        </View>
      </View>

      <View className="mt-4">
        <View className="flex-row justify-between">
          {/* FIRST NAME */}
          <View style={{ flexBasis: "47%" }}>
            <Controller
              name="first_name"
              control={control}
              render={({ field: { value, onBlur, onChange } }) => (
                <Input
                  required
                  autoFocus
                  returnKeyType="next"
                  label="نام"
                  value={value}
                  onBlur={onBlur}
                  className="text-right"
                  onChangeText={onChange}
                  onSubmitEditing={() => lastNameRef.current?.focus()}
                  error={formState.errors.first_name && formState.errors.first_name.message}
                />
              )}
            />
          </View>

          {/* LAST NAME */}
          <View style={{ flexBasis: "47%" }}>
            <Controller
              name="last_name"
              control={control}
              render={({ field: { value, onBlur, onChange } }) => (
                <Input
                  ref={lastNameRef}
                  required
                  label="نام خانوادگی"
                  value={value}
                  onBlur={onBlur}
                  className="text-right"
                  onChangeText={onChange}
                  error={formState.errors.last_name && formState.errors.last_name.message}
                />
              )}
            />
          </View>
        </View>
      </View>

      <View className="mt-5">
        <Button loading={loading} onPress={handleSubmit(onSubmit)}>
          ثبت
        </Button>
      </View>
    </Modal>
  );
};

export default UpdateNameModal;
