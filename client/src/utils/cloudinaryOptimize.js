export const cloudinaryOptimize = (
  url,
  options = "w_400,h_400,c_fill,f_auto,q_auto,dpr_auto"
) => {
  if (!url || !url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/${options}/`);
};
