module.exports = () => {
  const rewrites = () => {
    return [{ source: "/posts/edit/:id", destination: "/posts/new" }];
  };
  return {
    reactStrictMode: true,
    rewrites,
  };
};
