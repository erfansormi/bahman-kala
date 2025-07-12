import Container from "@/components/common/container";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Text from "@/components/ui/text";
import View from "@/components/ui/view";
import { useLogin } from "@/hooks/auth/useLogin";
import { Link } from "expo-router";
import React, { useRef } from "react";
import { Controller } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, TextInput } from "react-native";

const Login = () => {
  const { form, loading, onSubmit } = useLogin();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = form;

  const passwordRef = useRef<TextInput>(null);

  return (
    <Container screenHeight>
      <KeyboardAvoidingView
        behavior={"padding"}
        className="flex-1 justify-center"
        contentContainerStyle={{ flex: 1, justifyContent: "center" }}
      >
        <ScrollView keyboardShouldPersistTaps={"handled"} showsVerticalScrollIndicator={false}>
          <View className="w-full min-h-screen justify-center">
            {/* TITLE */}
            <Text size="3xl" fontFamily="vazirBold" className="text-center text-rose-600">
              بهمان کالا
            </Text>

            <Text size="xl" className="pt-2 text-center">
              ورود
            </Text>

            <View style={{ gap: 8, marginBottom: 12 }}>
              {/* EMAIL */}
              <View>
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { onBlur, onChange, value } }) => (
                    <Input
                      value={value}
                      onSubmitEditing={() => passwordRef.current?.focus()}
                      returnKeyType="next"
                      onChange={onBlur}
                      onChangeText={onChange}
                      label="ایمیل"
                      inputMode="email"
                      keyboardType="email-address"
                      autoComplete="email"
                      placeholder="ایمیل خود را وارد کنید"
                      error={errors.email && errors.email.message}
                    />
                  )}
                />
              </View>

              {/* PASSWORD */}
              <View>
                <Controller
                  name="password"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      ref={passwordRef}
                      value={value}
                      onChange={onBlur}
                      onChangeText={onChange}
                      label="پسورد"
                      secureTextEntry
                      autoComplete="password"
                      placeholder="رمز عبور خود را وارد کنید"
                      error={errors.password && errors.password.message}
                    />
                  )}
                />
              </View>
            </View>
            {/* LINK TO SIGNUP */}
            <View className="flex-row items-center" style={{ gap: 8 }}>
              <Text style={{ fontSize: 15 }}>حساب کاربری ندارید؟</Text>
              <Link
                href={"/auth/signup"}
                className="text-cyan-500"
                style={{ fontFamily: "vazir", fontSize: 15 }}
              >
                ثبت نام در بهمان کالا
              </Link>
            </View>

            <View className="pt-4">
              <Button
                size="base"
                touchableProps={{
                  onPress: handleSubmit(onSubmit),
                  disabled: loading,
                }}
                loading={loading}
              >
                ورود
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Login;
