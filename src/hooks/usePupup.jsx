import { useState } from "react";

const usePopup = () => {
  const [open, setOpen] = useState(false);

  const handle_open = () => {
    setOpen(true);
  };

  const handle_close = () => {
    setOpen(false);
  };

  return { open, handle_open, handle_close };
};

export default usePopup;
