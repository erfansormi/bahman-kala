import React, { useRef, useState } from "react";
import { TextInput } from "react-native";
import Modal from "@/components/ui/modal";
import Text from "@/components/ui/text";
import View from "@/components/ui/view";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePasswordData, updatePasswordSchema } from "@/utils/schemas";
import { editPassword } from "@/services/profile";
import { useToast } from "react-native-toast-notifications";
import { AxiosError } from "axios";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdatePasswordModal = ({ open, setOpen }: Props) => {
  const toast = useToast();
  const newRef = useRef<TextInput>(null);
  const newRepeatRef = useRef<TextInput>(null);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState } = useForm<UpdatePasswordData>({
    resolver: zodResolver(updatePasswordSchema),
  });
  const onSubmit = (data: UpdatePasswordData) => {
    setLoading(true);
    editPassword({ current_password: data.current, new_password: data.new })
      .then((res) => {
        setOpen(false);
        toast.show("رمز عبور با موفقیت تغییر کرد", {
          type: "success",
        });
      })
      .catch((err: AxiosError<{ message: string }>) => {
        toast.show(err.response?.data?.message || "خطا در تغییر رمز عبور", {
          type: "danger",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal open={open} setOpen={setOpen} title="تغییر رمز عبور">
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
        <View style={{ gap: 4 }}>
          {/* CURRENT NEW PASSWORD */}
          <View>
            <Controller
              name="current"
              control={control}
              render={({ field: { value, onBlur, onChange } }) => (
                <Input
                  required
                  autoFocus
                  secureTextEntry
                  returnKeyType="next"
                  label="رمز عبور کنونی"
                  value={value}
                  onBlur={onBlur}
                  className="text-right"
                  onChangeText={onChange}
                  onSubmitEditing={() => newRef.current?.focus()}
                  error={formState.errors.current?.message}
                />
              )}
            />
          </View>

          {/* NEW PASSWORD */}
          <View>
            <Controller
              name="new"
              control={control}
              render={({ field: { value, onBlur, onChange } }) => (
                <Input
                  ref={newRef}
                  required
                  label="رمز عبور جدید"
                  onSubmitEditing={() => newRepeatRef.current?.focus()}
                  returnKeyType="next"
                  value={value}
                  secureTextEntry
                  onBlur={onBlur}
                  className="text-right"
                  onChangeText={onChange}
                  error={formState.errors.new?.message}
                />
              )}
            />
          </View>

          {/* REPEAT NEW PASSWORD */}
          <View>
            <Controller
              name="newRepeat"
              control={control}
              rules={{
                validate: (value, data) => value === data.new || "رمز عبور های جدید یکسان نیستند!",
              }}
              render={({ field: { value, onBlur, onChange } }) => (
                <Input
                  ref={newRepeatRef}
                  required
                  label="تکرار رمز عبور جدید"
                  value={value}
                  secureTextEntry
                  onBlur={onBlur}
                  className="text-right"
                  onChangeText={onChange}
                  error={formState.errors.newRepeat?.message}
                />
              )}
            />
          </View>
        </View>
      </View>

      <View className="mt-5">
        <Button size="base" loading={loading} onPress={handleSubmit(onSubmit)}>
          ثبت
        </Button>
      </View>
    </Modal>
  );
};

export default UpdatePasswordModal;
