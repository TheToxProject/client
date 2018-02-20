import React from "react";
import { View } from "react-native";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Input from "../components/Input";
import FormHeader from "../components/FormHeader";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const darkBackgroundStyle = {
  backgroundColor: "#414141",
  padding: 16
};

storiesOf("Logo", module)
  .add("with original size", () => (
    <Logo style={darkBackgroundStyle} size={"original"} />
  ))
  .add("with medium size", () => (
    <Logo style={darkBackgroundStyle} size={"medium"} />
  ))
  .add("with small size", () => (
    <Logo style={darkBackgroundStyle} size={"small"} />
  ))
  .add("with big size", () => <Logo style={darkBackgroundStyle} size={"big"} />)
  .add("with bigger size", () => (
    <Logo style={darkBackgroundStyle} size={"bigger"} />
  ));

storiesOf("Button", module)
  .add("with text", () => (
    <Button
      style={{ width: 100 }}
      onPress={action("clicked")}
      text="Hello Button"
    />
  ))
  .add("with some emoji", () => (
    <Button
      style={{ width: 95 }}
      onPress={action("clicked")}
      text="😀 😎 👍 💯"
    />
  ));

storiesOf("Input", module)
  .add("with base style", () => <Input onChangeText={action("changed")} />)
  .add("with placeholder", () => (
    <Input
      placeholder={"This is the placeholder, m8!"}
      onChangeText={action("changed")}
    />
  ))
  .add("with some emoji in placeholder", () => (
    <Input placeholder={"😀 😎 👍 💯"} onChangeText={action("changed")} />
  ))
  .add("with secureTextEntry", () => (
    <Input
      placeholder={"😀 😎 👍 💯"}
      secureTextEntry={true}
      onChangeText={action("changed")}
    />
  ));

storiesOf("FormHeader", module)
  .add("with base style", () => (
    <View style={darkBackgroundStyle}>
      <FormHeader text={"My cool form header!"} />
    </View>
  ))
  .add("with some emoji", () => (
    <View style={darkBackgroundStyle}>
      <FormHeader text={"😀 😎 👍 💯"} />
    </View>
  ));

storiesOf("Forms", module)
  .add("Login form", () => (
    <LoginForm disableLinks style={darkBackgroundStyle} />
  ))
  .add("Register form", () => (
    <RegisterForm disableLinks style={darkBackgroundStyle} />
  ));
