import {
  AttachFileOutlined,
  DeleteOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const posts = await response.json();

    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind?"
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <Box
                {...getRootProps()}
                border={`2px dashed ${palette.primary.main}`}
                borderRadius="12px"
                p="2rem"
                textAlign="center"
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    borderColor: palette.primary.light,
                    backgroundColor: palette.background.default,
                    transition: "all 0.3s ease",
                  },
                  backgroundColor: palette.background.alt,
                  transition: "all 0.3s ease",
                }}
              >
                <input {...getInputProps()} />
                {!image ? (
                  <Box>
                    <Typography
                      variant="h6"
                      color="primary"
                      fontWeight="500"
                      mb="0.5rem"
                    >
                      Upload Image
                    </Typography>
                    <Typography variant="body2" color="neutral.medium">
                      Click to browse or drag and drop
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <Box
                      component="img"
                      src={URL.createObjectURL(image)}
                      alt="post"
                      sx={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "8px",
                        objectFit: "cover",
                        mb: "1rem",
                        border: `2px solid ${palette.primary.main}`,
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <Typography
                        variant="body1"
                        fontWeight="500"
                        color="primary"
                        textAlign="center"
                      >
                        {image.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="neutral.medium"
                        textAlign="center"
                      >
                        Click to change
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setImage(null);
                      }}
                      sx={{
                        position: "absolute",
                        top: "0.5rem",
                        right: "0.5rem",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                        },
                      }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  </Box>
                )}
              </Box>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            "&:hover": {
              backgroundColor: palette.primary.dark,
              color: palette.background.alt,
            },
            "&:disabled": {
              backgroundColor: palette.neutral.medium,
              color: "rgba(255, 255, 255, 0.5)",
            },
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
