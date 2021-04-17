import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import SendIcon from "@material-ui/icons/Send";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

type Props = {
  text: string;
  handleChange: (e: any) => void;
  onSend: (type: string) => void;
};
const Send = ({ text, handleChange, onSend }: Props) => {
  return (
    <div>
      <TextField
        value={text}
        type="text"
        onChange={handleChange}
        onKeyPress={(e) => {
          if (e.key === "Enter") onSend("send-message");
        }}
        style={{ width: "80%", margin: "0 10%" }}
        autoFocus
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Send">
                <IconButton size="small" onClick={() => onSend("send-message")}>
                  <SendIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Send;
