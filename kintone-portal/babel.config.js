module.exports = function(api) {
  api.cache(true);
  const presets = [
    '@babel/env',
    '@babel/react',
    '@babel/preset-typescript'
  ];
  const plugins = [
    [
      '@babel/plugin-proposal-class-properties',
    ],
  ];
  return {
    presets,
    plugins,
  };
};
