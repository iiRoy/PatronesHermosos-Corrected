module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' }, modules: 'auto' }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};
