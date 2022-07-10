module.exports = () => {
  const rewrites = () => {
    return [{ source: "/stories/edit/:id", destination: "/stories/new" }];
  };
  const images = {
    domains: ["res.cloudinary.com"],
  };
  return {
    reactStrictMode: true,
    rewrites,
    images,
  };
};
