import * as React from "react";
import { useConnection } from "../../context/connection-conext";
//props
//hooks
//render props
interface Message {
  name: string;
  message: string;
}
interface Props {}

const MessageBox: React.FC<Props> = () => {
  const { state, dispatch } = useConnection();
  const [text, setText] = React.useState<string>("");
  const onClickhandle = (type: string) => {
    if (text.trim()) {
      dispatch({ type: type, payload: { name: "prayas", note: text.trim() } });
      setText("");
    }
  };
  const handleChange = (e: any) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input
        value={text}
        type="text"
        onChange={handleChange}
        onKeyPress={(e) => {
          if (e.key === "Enter") onClickhandle("send-message");
        }}
      />
      <div>
        {state.messages.map((message: any) => {
          return (
            <p>
              {message.name} : {message.message}
            </p>
          );
        })}
      </div>
      <button onClick={() => onClickhandle("send-message")}>click me</button>
    </div>
  );
};

export default MessageBox;
