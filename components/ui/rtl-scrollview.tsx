import React, { useRef } from "react";
import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";

const RTLScrollView = ({ ...props }: ScrollViewProps) => {
  const scrollRef = useRef<ScrollView>(null);
  const scrollToEnd = () => scrollRef.current?.scrollToEnd({ animated: false });

  return (
    <ScrollView
      horizontal
      ref={scrollRef}
      showsHorizontalScrollIndicator={false}
      onContentSizeChange={scrollToEnd}
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
      {...props}
    >
      {props.children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexDirection: "row-reverse",
  },
});

export default RTLScrollView;
