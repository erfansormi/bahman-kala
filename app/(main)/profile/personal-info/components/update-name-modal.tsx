import React, { useRef, useState } from "react";
import View from "@/components/ui/view";
import Text from "@/components/ui/text";
import { TextInput } from "react-native";
import Modal from "@/components/ui/modal";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateNameData, updateNameSchema } from "@/utils/schemas";
import { editName } from "@/services/profile";
import { useToast } from "react-native-toast-notifications";
import { useUserStore } from "@/store/user-store";
import { windowWidth } from "@/utils/dimensions";

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
      <View className="w-full">
        <View>
          <Text fontFamily="vazirLight" size="sm">
            لطفا اطلاعات شناسایی خود را وارد کنید.
          </Text>
          <Text fontFamily="vazirLight" size="sm">
            نام و نام خانوادگی شما باید با اطلاعاتی که وارد می کنید مطابقت داشته باشد.
          </Text>
        </View>
      </View>

      <View className="mt-4 w-full pr-0.5" style={{ minWidth: windowWidth - 34 }}>
        <View className="flex-row justify-between flex flex-1 w-full">
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

      <View className="mt-5 w-full">
        <Button size="base" loading={loading} onPress={handleSubmit(onSubmit)}>
          ثبت
        </Button>
      </View>
    </Modal>
  );
};

export default UpdateNameModal;
