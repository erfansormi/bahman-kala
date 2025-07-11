import React, { useState } from "react";

import View from "@/components/ui/view";
import Modal from "@/components/ui/modal";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateEmailData, updateEmailSchema } from "@/utils/schemas";
import { editEmail } from "@/services/profile";
import { useToast } from "react-native-toast-notifications";
import { useUserStore } from "@/store/user-store";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateEmailModal = ({ open, setOpen }: Props) => {
  const toast = useToast();
  const { setUser, user } = useUserStore();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState } = useForm<UpdateEmailData>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: { email: user?.email },
  });

  const onSubmit = (data: UpdateEmailData) => {
    setLoading(true);
    editEmail(data)
      .then((res) => {
        setUser({
          ...user!,
          email: data.email,
        });
        setOpen(false);
        toast.show("ایمیل با موفقیت تغییر کرد", {
          type: "success",
        });
      })
      .catch((err) => {
        toast.show("خطا در تغییر ایمیل", {
          type: "danger",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal open={open} setOpen={setOpen} title="ویرایش ایمیل">
      <View className="mt-4">
        {/* EMAIL */}
        <View>
          <Controller
            name="email"
            control={control}
            render={({ field: { value, onBlur, onChange } }) => (
              <Input
                required
                autoFocus
                label="ایمیل"
                value={value}
                onBlur={onBlur}
                className="text-right"
                onChangeText={onChange}
                error={formState.errors.email?.message}
              />
            )}
          />
        </View>
      </View>

      <View className="mt-3">
        <Button size="base" loading={loading} onPress={handleSubmit(onSubmit)}>
          ثبت
        </Button>
      </View>
    </Modal>
  );
};

export default UpdateEmailModal;
