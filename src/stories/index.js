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
import UserButton from "../components/UserButton";
import ContactItem from "../components/ContactItem";
import Avatar from "../components/Avatar";

import Presence from "../utilities/enums/Presence";
import Colors from "../styles/colors";

const darkBackgroundStyle = {
  backgroundColor: "#414141",
  padding: 16
};

const avatarUri = "https://avatars.githubusercontent.com/Ogromny?size=46";

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
      style={{ width: 110 }}
      onPress={action("clicked")}
      text="Hello Button"
    />
  ))
  .add("with UPPERCASE", () => (
    <Button
      style={{ width: 130 }}
      onPress={action("clicked")}
      text="Hello Button"
      uppercase
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

storiesOf("UserButton", module)
  .add("with avatar", () => (
    <UserButton
      avatarUri={"https://avatars2.githubusercontent.com/u/8523159"}
      username={"SkyzohKey"}
    />
  ))
  .add("with letter", () => <UserButton username={"S"} />);

storiesOf("Avatar", module)
  .add("with default size", () => <Avatar source={{ uri: avatarUri }} />)
  .add("with custom size", () => (
    <Avatar size={72} source={{ uri: avatarUri }} />
  ))
  .add("with letter", () => <Avatar size={96} username="SkyzohKey" />);

storiesOf("ContactItem", module)
  .add("with basic style", () => (
    <View style={{ width: 340 }}>
      <ContactItem
        username={"Username"}
        status={"Status message that rocks! 🤘"}
        avatarUri={avatarUri}
        onPress={action("ContactItem clicked.")}
      />
    </View>
  ))
  .add("with presence indicator", () => (
    <View style={{ width: 340 }}>
      <ContactItem
        username={"Username"}
        status={"Status message that rocks! 🤘"}
        avatarUri={avatarUri}
        presence={Presence.ONLINE}
        presenceBackgroundColor={Colors.BACKGROUND}
        onPress={action("ContactItem clicked.")}
      />
    </View>
  ))
  .add("with timestamp", () => (
    <View style={{ width: 340 }}>
      <ContactItem
        username={"Username"}
        status={"Status message that rocks! 🤘"}
        timestamp={1519659888}
        avatarUri={avatarUri}
        onPress={action("ContactItem clicked.")}
      />
    </View>
  ))
  .add("with unread style", () => (
    <View style={{ width: 340 }}>
      <ContactItem
        unread
        timestamp={1519659888}
        username={"Username"}
        status={"Status message that rocks! 🤘"}
        avatarUri={avatarUri}
        onPress={action("ContactItem clicked.")}
      />
    </View>
  ))
  .add("with all props & styles", () => (
    <View style={{ width: 340 }}>
      <ContactItem
        unread
        username={"Username"}
        status={"Status message that rocks! 🤘"}
        timestamp={1519659888}
        avatarUri={avatarUri}
        presence={Presence.ONLINE}
        presenceBackgroundColor={Colors.BACKGROUND}
        onPress={action("ContactItem clicked.")}
      />
    </View>
  ));
