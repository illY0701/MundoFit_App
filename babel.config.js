module.exports = {
    presets: ['babel-preset-expo'],
    plugins: [
      // ...outros plugins que você já tenha
      'react-native-reanimated/plugin',  // **sempre por último!**
    ],
  };
  