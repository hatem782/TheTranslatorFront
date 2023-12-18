import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { useEffect } from "react";
import { useState } from "react";

const Popup = ({
  open,
  handleClose,
  children,
  auto_close = false,
  duration = 4000,
  onClose = () => {},
}) => {
  const [gate, setgate] = useState(false);

  useEffect(() => {
    if (auto_close && open) {
      setTimeout(() => {
        handleClose();
      }, duration);
    }
    if (open) {
      setgate(true);
    }
  }, [open]);

  useEffect(() => {
    if (!open && gate) {
      setTimeout(() => {
        onClose();
      }, 500);
    }
  }, [open, gate]);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "fit-content",
            position: "relative",
            backgroundColor: "transparent",
            borderRadius: "0",
          },
        },
      }}
    >
      {children}
    </Dialog>
  );
};

export default Popup;
