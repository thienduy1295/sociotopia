import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  borderRadius: "0.75rem",
  backgroundColor: theme.palette.background.alt,
}));

export default WidgetWrapper;
