module.exports = () => {
  const rewrites = () => {
    return [{ source: "/stories/edit/:id", destination: "/stories/new" }];
  };
  return {
    reactStrictMode: true,
    rewrites,
  };
};
