import React from "react";
import Text from "../ui/text";

interface Props {
  title: string;
  align?: "center" | "right" | "left";
}

const SectionTitle = ({ title, align = "center" }: Props) => {
  return (
    <Text className="mb-5 mt-8" size="xl" style={{ textAlign: align }}>
      {title}
    </Text>
  );
};

export default SectionTitle;
