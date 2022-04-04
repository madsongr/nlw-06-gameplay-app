module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['inline-dotenv'], // adicionar depois de instalar yarn add dotenv babel-plugin-inline-dotenv
  };
};
