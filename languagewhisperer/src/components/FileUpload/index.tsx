import React, { useCallback } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import clsx from "clsx";
import { setFile, useWhispererDispatch } from "@/providers/WhispererProvider";

const useStyle = makeStyles({
  root: {
    cursor: "pointer",
    textAlign: "center",
    display: "flex",
    "&:hover p,&:hover svg,& img": {
      opacity: 1,
    },
    "& p, svg": {
      opacity: 0.4,
    },
    "&:hover img": {
      opacity: 0.3,
    },
  },
  noMouseEvent: {
    pointerEvents: "none",
  },
  iconText: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
  },
  hidden: {
    display: "none",
  },
  onDragOver: {
    "& img": {
      opacity: 0.3,
    },
    "& p, svg": {
      opacity: 1,
    },
  },
});

const StyledBox = styled(Box)({
  margin: "auto",
  width: "600px",
  height: "100px",
  backgroundColor: "#fff",
});

export const FileUpload: React.FC = () => {
  const hoverLabel = "Click or drag to upload file";
  const dropLabel = "Drop file here";

  const classes = useStyle();
  const dispatch = useWhispererDispatch();
  const formData = new FormData();
  const [labelText, setLabelText] = React.useState<string>(hoverLabel);
  const [isDragOver, setIsDragOver] = React.useState<boolean>(false);
  const uploadFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      if (reader) {
        reader.onloadend = () => {
          const blob = (reader.result as string).replace("data:", "").replace(/^.+,/, "");
          setFile(dispatch, blob);
        };
        reader.readAsDataURL(file);
      }
    },
    [dispatch],
  );

  const stopDefaults = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const dragEvents = {
    onDragEnter: (e: React.DragEvent) => {
      stopDefaults(e);
      setIsDragOver(true);
      setLabelText(dropLabel);
    },
    onDragLeave: (e: React.DragEvent) => {
      stopDefaults(e);
      setIsDragOver(false);
      setLabelText(hoverLabel);
    },
    onDragOver: stopDefaults,
    onDrop: (e: React.DragEvent<HTMLElement>) => {
      stopDefaults(e);
      setLabelText(hoverLabel);
      setIsDragOver(false);
      if (e.dataTransfer.files[0]) {
        uploadFile(e.dataTransfer.files[0]);
      }
    },
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      uploadFile(file);
    }
  };

  return (
    <Stack direction="column" spacing={1} alignItems="center" justifyContent="center">
      <input onChange={handleChange} accept={"image/*"} style={{ display: "none" }} id="file-upload" type="file" />

      <label htmlFor="file-upload" {...dragEvents} className={clsx(classes.root, isDragOver && classes.onDragOver)}>
        <StyledBox className={classes.noMouseEvent}>
          <>
            <StyledBox className={classes.iconText}>
              <CloudUploadIcon fontSize="large" />
              <Typography>{labelText}</Typography>
            </StyledBox>
          </>
        </StyledBox>
      </label>
    </Stack>
  );
};
