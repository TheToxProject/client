import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { Logo } from "../components/Logo";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

storiesOf("Logo", module)
  .add("with original size", () => <Logo size={"original"} />)
  .add("with medium size", () => <Logo size={"medium"} />)
  .add("with small size", () => <Logo size={"small"} />)
  .add("with big size", () => <Logo size={"big"} />)
  .add("with bigger size", () => <Logo size={"bigger"} />);

storiesOf("Button", module)
  .add("with text", () => (
    <Button onClick={action("clicked")}>Hello Button</Button>
  ))
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>😀 😎 👍 💯</Button>
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
