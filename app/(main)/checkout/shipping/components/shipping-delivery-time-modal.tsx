import Modal from "@/components/ui/modal";
import RadioButton from "@/components/ui/radio-button";
import Text from "@/components/ui/text";
import View from "@/components/ui/view";
import { useShippingStore } from "@/store/shipping-store";
import { colors } from "@/utils/constants/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment-jalaali";
import React, { useEffect } from "react";
import { ScrollView, TouchableNativeFeedback, TouchableOpacity } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

let dates = [];
for (let i = 2; i < 7; i++) {
  dates.push(moment().add(i, "days"));
}
useShippingStore.setState({ activeDateTab: dates[0].date() });

const ShippingSelectDateModal = () => {
  const setter = useShippingStore.setState;
  const { deliverTimeModal, deliveryDate, deliveryHour, activeDateTab } = useShippingStore();
  const setOpen = (value: boolean) => setter({ deliverTimeModal: value });
  const x = useSharedValue(200);

  useEffect(() => {
    x.value = 200;
    x.value = withSpring(0, { duration: 2000 });
  }, [deliverTimeModal]);

  return (
    <Modal
      open={deliverTimeModal}
      setOpen={setOpen as any}
      title="انتخاب بازه زمانی"
      description={
        <View className="flex-row items-center" style={{ gap: 8 }}>
          <MaterialCommunityIcons name="truck-fast-outline" size={26} color={colors.primary} />
          <Text className="text-gray-500" size="sm">
            ارسال کالاهای معمولی
          </Text>
        </View>
      }
    >
      <View className="pb-3" style={{ gap: 10 }}>
        {/* DATES TABS */}
        <ScrollView
          horizontal
          style={{ width: "100%" }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: "100%", direction: "rtl" }}
        >
          <View className="flex flex-row items-center justify-between">
            {dates.map((date, i) => (
              <View
                key={date.day()}
                className={`w-1/5 ${
                  date.date() === activeDateTab && "border-b-[3px] border-b-cyan-500"
                }`}
              >
                <TouchableNativeFeedback
                  onPress={() => {
                    x.value = activeDateTab && activeDateTab > date.date() ? -400 : 200;
                    x.value = withSpring(0, { duration: 2000 });
                    setter({ activeDateTab: date.date() });
                  }}
                >
                  <View className="items-center p-2 rounded-lg">
                    <Text size="sm" className="text-gray-600">
                      {Intl.DateTimeFormat("fa", { weekday: "long" }).format(date.toDate())}
                    </Text>

                    <Text className="text-gray-600">{date.jDate()}</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* HOURS */}
        <Animated.View
          className="px-5"
          style={{
            transform: [{ translateX: x }],
          }}
        >
          {hours.map((item, i) => (
            <View
              key={item.title}
              className={`py-3 border-b border-b-gray-200/70 ${
                i + 1 >= hours.length && "border-b-0"
              }`}
            >
              <TouchableOpacity
                onPress={() =>
                  setter((get) => ({
                    deliveryHour: item.value,
                    deliveryDate: dates.find((item) => item.date() === get.activeDateTab),
                  }))
                }
              >
                <View className="items-center flex-row" style={{ gap: 8 }}>
                  <RadioButton
                    isActive={item.value === deliveryHour && deliveryDate?.date() === activeDateTab}
                  />
                  <View className="flex-row items-center" style={{ gap: 8 }}>
                    <Text size={"sm"}>ساعت</Text>
                    <Text size={"sm"}>{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ShippingSelectDateModal;

type Hour = { title: string; value: `${number}${"am" | "pm"}-${number}${"am" | "pm"}` };
const hours: Hour[] = [
  { title: "9 تا 12", value: "9am-12am" },
  { title: "12 تا 15", value: "12am-15pm" },
  { title: "15 تا 18", value: "15pm-18pm" },
  { title: "18 تا 21", value: "18pm-21pm" },
];
