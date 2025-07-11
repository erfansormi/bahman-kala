import Text from "./text";
import View from "./view";
import { ViewProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  isEmpty?: boolean;
  emptyTitle?: string;
}

const Card = ({ style, isEmpty, emptyTitle, className, ...props }: ViewProps & Props) => {
  return (
    <View className={"rounded-lg border bg-white border-gray-200 p-4"} style={[style]} {...props}>
      {isEmpty ? (
        <View className="min-h-[120px]">
          {emptyTitle && <Text>{emptyTitle}</Text>}
          <View className="items-center grow justify-center flex-row" style={{ gap: 8 }}>
            <MaterialIcons name="search-off" size={30} color={"rgb(107 114 128)"} />
            <Text className="text-gray-500">موردی برای نمایش وجود ندارد!</Text>
          </View>
        </View>
      ) : (
        props.children
      )}
    </View>
  );
};

export default Card;
