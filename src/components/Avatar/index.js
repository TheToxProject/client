import React, { PureComponent } from "react";
import { Platform, View, Image, Text } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

export class Avatar extends PureComponent {
  render() {
    const {
      draggable,
      letter,
      letterSize,
      letterColor,
      noAvatarBackgroundColor,
      presenceBackgroundColor,
      presenceSource,
      scaleFactor,
      source,
      size,
      title
    } = this.props;

    const presenceStyle = {
      borderColor: presenceBackgroundColor,
      backgroundColor: presenceBackgroundColor
    };
    const ratio = styles.letter.fontSize / size;
    const letterSizeStyle = { fontSize: letterSize / ratio * scaleFactor };
    const sizeStyle = { width: size, height: size, borderRadius: size / 2 };

    return (
      <View style={styles.container}>
        {(typeof source === "string" || typeof source === "object") &&
        source ? (
          <View style={[styles.avatarWrapper, sizeStyle]}>
            <Image
              {...Platform.select({
                android: { fadeDuration: 0 },
                ios: { fadeDuration: 0 }
              })}
              draggable={draggable}
              source={source}
              style={[styles.avatar, sizeStyle]}
              title={title}
            />
          </View>
        ) : (
          <View
            style={[
              styles.noAvatar,
              sizeStyle,
              { backgroundColor: noAvatarBackgroundColor }
            ]}
          >
            <Text
              style={[styles.letter, letterSizeStyle, { color: letterColor }]}
            >
              {letter[0]}
            </Text>
          </View>
        )}
        {presenceSource != null && (
          <View style={[styles.presenceWrapper, presenceStyle]}>
            <Image
              {...Platform.select({
                android: { fadeDuration: 0 },
                ios: { fadeDuration: 0 }
              })}
              draggable={false}
              source={presenceSource}
              style={styles.presence}
            />
          </View>
        )}
      </View>
    );
  }
}

Avatar.propTypes = {
  draggable: PropTypes.bool,
  letter: PropTypes.string,
  letterSize: PropTypes.number,
  letterColor: PropTypes.string,
  noAvatarBackgroundColor: PropTypes.string,
  presenceBackgroundColor: PropTypes.string,
  presenceSource: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  size: PropTypes.number,
  scaleFactor: PropTypes.number,
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.string
};

Avatar.defaultProps = {
  draggable: false,
  letter: "A",
  letterSize: 18,
  letterColor: "black",
  noAvatarBackgroundColor: "gray",
  presenceBackgroundColor: "white",
  presenceSource: null,
  size: 46,
  scaleFactor: 0.6,
  source: null,
  title: null
};

export default Avatar;
