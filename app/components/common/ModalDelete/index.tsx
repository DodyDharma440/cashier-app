import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Typography,
} from "@material-ui/core";

type Props = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  id: string;
  extraInfo?: string;
  deleteAction: (id: string) => void;
  disabledButton?: boolean;
};

const ModalDelete: React.FC<Props> = ({
  isOpen,
  onClose,
  id,
  extraInfo,
  title,
  deleteAction,
  disabledButton,
}) => {
  const handleDelete = () => {
    deleteAction(id);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        {title ? title : "Hapus"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography component="span">
            Apakah Anda yakin untuk menghapus{" "}
          </Typography>
          <Typography style={{ fontWeight: "bold" }} component="span">
            {extraInfo}?
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="contained">
          Batal
        </Button>
        <Button
          disabled={disabledButton}
          onClick={handleDelete}
          color="primary"
          variant="contained"
        >
          Hapus
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDelete;
