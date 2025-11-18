import React from "react";
import { ColorValue, StyleProp, ViewStyle } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

type Props = {
  children: React.ReactNode;
  colors: [ColorValue, ColorValue, ...ColorValue[]];
  extraStyles?: StyleProp<ViewStyle>;
};

const LinearLayout = ({ children, colors, extraStyles }: Props) => {
  return (
    <LinearGradient colors={colors} style={extraStyles}>
      {children}
    </LinearGradient>
  );
};

export default LinearLayout;
