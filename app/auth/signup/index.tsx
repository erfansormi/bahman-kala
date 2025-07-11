import { Link } from "expo-router";
import React, { useRef } from "react";
import View from "@/components/ui/view";
import Text from "@/components/ui/text";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Controller } from "react-hook-form";
import { useSignup } from "@/hooks/auth/useSignup";
import { SignupSchemaData } from "@/utils/schemas";
import Container from "@/components/common/container";
import { KeyboardAvoidingView, ScrollView, TextInput } from "react-native";

const Signup = () => {
  const { form, loading, onSubmit } = useSignup();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = form;

  const first_name_ref = useRef<TextInput>(null);
  const last_name_ref = useRef<TextInput>(null);
  const email_ref = useRef<TextInput>(null);
  const password_ref = useRef<TextInput>(null);
  const confirmPassword_ref = useRef<TextInput>(null);

  const inputRefs = {
    first_name: first_name_ref,
    last_name: last_name_ref,
    email: email_ref,
    password: password_ref,
    confirmPassword: confirmPassword_ref,
  };

  const nextInputRefs = {
    first_name: last_name_ref,
    last_name: email_ref,
    email: password_ref,
    password: confirmPassword_ref,
    confirmPassword: undefined,
  };

  return (
    <Container className="flex-1" screenHeight>
      <KeyboardAvoidingView behavior={"padding"} className="flex-1 justify-center">
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"}>
          <View className="h-screen justify-center">
            {/* TITLE */}
            <Text size="3xl" fontFamily="vazirBold" className="text-center text-rose-600">
              بهمان کالا
            </Text>

            <Text size="xl" className="pt-2 text-center">
              ثبت نام
            </Text>

            {/* INPUTS */}
            <View style={{ gap: 8, marginBottom: 12 }}>
              {inputs.map((input) => (
                <View key={input.name}>
                  <Controller
                    name={input.name}
                    control={control}
                    rules={{
                      validate: () =>
                        form.watch("password") === form.watch("confirmPassword") ||
                        "رمز عبور های وارد شده یکسان نیستند!",
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        value={value}
                        onChange={onBlur}
                        label={input.label}
                        className="text-right"
                        onChangeText={onChange}
                        placeholder={input.placeholder}
                        ref={inputRefs[input.name]}
                        autoComplete={input.autoComplete}
                        onSubmitEditing={() => nextInputRefs[input.name]?.current?.focus()}
                        returnKeyType={nextInputRefs[input.name] ? "next" : "done"}
                        inputMode={input.autoComplete === "email" ? "email" : "text"}
                        secureTextEntry={input.autoComplete === "new-password" ? true : false}
                        multiline={true}
                        numberOfLines={1}
                        blurOnSubmit={true}
                        error={
                          (errors[input.name] && errors[input.name]?.message) ||
                          (form.watch("confirmPassword") !== form.watch("password") &&
                          input.name === "confirmPassword" &&
                          form.formState.submitCount > 0
                            ? "رمز عبور های وارد شده یکسان نیستند!"
                            : undefined)
                        }
                      />
                    )}
                  />
                </View>
              ))}
            </View>

            {/* LINK TO LOGIN */}
            <View className="flex-row pt-3 items-center" style={{ gap: 8 }}>
              <Text style={{ fontSize: 15 }}>حساب کاربری دارید؟</Text>
              <Link
                href={"/auth/login"}
                className="text-cyan-500"
                style={{ fontFamily: "vazir", fontSize: 15 }}
              >
                ورود به بهمان کالا
              </Link>
            </View>

            <View className="pt-3">
              <Button
                size="base"
                touchableProps={{
                  onPress: handleSubmit(onSubmit),
                  disabled: loading,
                }}
                loading={loading}
              >
                ثبت نام
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Signup;

interface Input {
  label: string;
  placeholder: string;
  name: keyof SignupSchemaData;
  autoComplete: "name-family" | "name" | "new-password" | "email";
}

export const inputs: Input[] = [
  {
    label: "نام",
    name: "first_name",
    autoComplete: "name",
    placeholder: "لطفا نام خود را وارد کنید",
  },
  {
    label: "نام خانوادگی",
    name: "last_name",
    autoComplete: "name-family",
    placeholder: "لطفا نام خانوادگی خود را وارد کنید",
  },
  {
    label: "ایمیل",
    name: "email",
    autoComplete: "email",
    placeholder: "لطفا ایمیل خود را وارد کنید",
  },
  {
    label: "رمز عبور",
    name: "password",
    autoComplete: "new-password",
    placeholder: "لطفا رمز عبور خود را وارد کنید",
  },
  {
    label: "تکرار رمز عبور",
    name: "confirmPassword",
    autoComplete: "new-password",
    placeholder: "لطفا رمز عبور خود را تکرار کنید",
  },
];
