import { styled } from "@mui/system";
import { useTheme } from "@mui/styles";

export default styled("div")(({ style }: any) => () => {
  const { boxShadowColor, backgroundColor }: any = useTheme();

  return {
    display: "flex",
    flexDirection: "column",

    width: "400px",
    borderRadius: "8px",
    padding: "16px",
    margin: "32px",
    backgroundColor,
    boxShadow: `0 1px 2px 0 ${boxShadowColor}, 0 1px 8px 0 ${boxShadowColor}`,
    ...style,
  };
});
