import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& .logo-part-1": {
              color: "grey.main",
              fontWeight: "600",
            },
            "& .logo-part-2": {
              color: "primary.main",
              fontWeight: "400",
              transition: "color 0.3s ease",
              "&:hover": {
                color: "primary.light",
              },
            },
          }}
        >
          <span className="logo-part-1">Socio</span>
          <span className="logo-part-2">topia</span>
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Sociotopia, your digital social realm!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
