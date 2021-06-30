import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  IUserForm,
  IUserFixedForm,
  IUser,
  IUserResponse,
} from "@custom-types/user";
import { UserStatus } from "@enums/user";
import { useProcess } from "@hooks/index";
import { addUser, updateUser } from "@actions/user";

type Props = {
  open: boolean;
  onClose: () => void;
  editValue: IUserForm | null;
  editId: string;
  users: IUser[];
  onUpdateUserState: (updateUser: IUser[]) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      margin: `${theme.spacing(1)}px 0px`,
    },
  })
);

const initialInputValue = {
  name: "",
  username: "",
  isAdmin: false,
};

const Form: React.FC<Props> = ({
  open,
  onClose,
  editValue,
  editId,
  onUpdateUserState,
  users,
}) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState<IUserForm>(initialInputValue);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { isLoading, startLoading, endLoading } = useProcess();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      isAdmin: e.target.checked,
    });
  };

  const callbackAction = (data: IUserResponse, error: any) => {
    endLoading();

    if (data) {
      onClose();
      setInputValue(initialInputValue);

      if (data.newUser) {
        onUpdateUserState([...users, data.newUser]);
        return;
      }

      if (data.updatedUser) {
        const i = users.findIndex(
          (user: IUser) => user._id === data.updatedUser?._id
        );
        users[i] = data.updatedUser;
        onUpdateUserState([...users]);
      }
    }

    if (error) {
      const message = error.response
        ? error.response.data.message
        : error.message;

      setErrorMessage(message);
    }
  };

  const handleSubmitAdd = (fixedForm: IUserFixedForm) => {
    addUser(fixedForm, callbackAction);
  };

  const handleSubmitUpdate = (fixedForm: IUserFixedForm) => {
    updateUser(fixedForm, editId, callbackAction);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startLoading();

    const fixedForm: IUserFixedForm = {
      name: inputValue.name,
      username: inputValue.username,
      status: inputValue.isAdmin ? UserStatus.admin : UserStatus.kasir,
    };

    if (editValue !== null) {
      handleSubmitUpdate(fixedForm);
    } else {
      handleSubmitAdd(fixedForm);
    }
  };

  useEffect(() => {
    endLoading();
    setErrorMessage(null);
    setInputValue(initialInputValue);
    if (editValue !== null) {
      setInputValue(editValue);
    }
  }, [open]);

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="dialog-title">
          {editValue ? "Edit Pengguna" : "Tambahkan Pengguna"}
        </DialogTitle>
        <DialogContent>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <TextField
            name="name"
            className={classes.input}
            label="Nama"
            fullWidth
            value={inputValue.name}
            onChange={handleChange}
            variant="outlined"
            required
          />
          <TextField
            name="username"
            className={classes.input}
            label="Username"
            fullWidth
            value={inputValue.username}
            onChange={handleChange}
            variant="outlined"
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheck}
                checked={inputValue.isAdmin}
                color="primary"
              />
            }
            label="Jadikan Sebagai Admin"
          />
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            onClick={onClose}
            color="secondary"
            variant="contained"
          >
            Batal
          </Button>
          <Button
            endIcon={
              isLoading && <CircularProgress color="secondary" size={15} />
            }
            type="submit"
            color="primary"
            variant="contained"
          >
            Simpan
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Form;
