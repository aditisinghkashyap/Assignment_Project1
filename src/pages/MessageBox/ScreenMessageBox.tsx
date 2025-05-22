import { Button } from "@/components/ui/button";
import users from "@/dummyDataForUsers/dummyData";
import { useNavigate, useParams } from "react-router-dom";
import Routes from "../../../routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { changeState } from "@/redux/sliceSelectedUser";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDown, ArrowRight, Loader2, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import {
  addMessage,
  fetchUser,
  fetchUserFailed,
  fetchUserSuccess,
} from "./redux/sliceMessages";
import { RootState } from "@/store";
import axios from "axios";

const ScreenMessageBox = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const nav = useNavigate();
  const userDetails = users.filter((item) => item.id.toString() === id)[0];
  const userMessages = useSelector((state: RootState) => state.reducerMessages);
  useEffect(() => {
    dispatch(changeState(Number(id)));
  }, []);
  useEffect(() => {
    if (!userMessages[id as string]) {
      dispatch(fetchUser(id as string));
    }
    setMessage("");
  }, [id]);

  function handleMessage() {
    if (message.trim().length === 0) {
      return;
    }
    setMessage("");
    dispatch(addMessage({ id: id as string, role: "user", content: message }));
    dispatch(fetchUser(id as string));
    //  response() ;
  }

  async function response() {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `you are ${userDetails.name} a consumer of our product. You are now roleplaying as ${userDetails.name}. As a consumer, ask the assistant questions about the product—such as problems, doubts, or feedback. Stay in character as a customer and start the conversation with a relevant question.`,
            },
            ...userMessages[id as string].history,
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );
      dispatch(
        fetchUserSuccess({
          id: id as string,
          role: "assistant",
          content: response.data.choices[0].message.content,
        })
      );
    } catch (err) {
      dispatch(
        fetchUserFailed({ id: id as string, error: "something went wrong" })
      );
    }
  }
  async function fetch() {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `${userDetails.name} is a consumer of our product. You are now roleplaying as ${userDetails.name}. As a consumer, ask the assistant questions about the product—such as problems, doubts, or feedback. Stay in character as a customer and start the conversation with a relevant question.`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );
      dispatch(
        fetchUserSuccess({
          id: id as string,
          role: "assistant",
          content: response.data.choices[0].message.content,
        })
      );
    } catch (err) {
      dispatch(
        fetchUserFailed({ id: id as string, error: "something went wrong" })
      );
    }
  }
  useEffect(() => {
    console.log(userMessages[id as string]);
    if (
      userMessages[id as string] &&
      userMessages[id as string].history.length === 0
    ) {
      fetch();
    } else if (
      userMessages[id as string] &&
      userMessages[id as string].history[
        userMessages[id as string].history.length - 1
      ].role === "user"
    ) {
      response();
    }
  }, [userMessages]);

  return (
    <div className="relative h-full">
      <div className="pb-4 border-b flex justify-between p-3 font-bold text-sm">
        <div>{userDetails.name}</div>
        <div>
          <Button
            className="rounded-sm w-[50px] h-[21px]"
            onClick={() => {
              dispatch(changeState(null));
              nav(Routes.SCREEN_HOME);
            }}
          >
            Close
          </Button>
        </div>
      </div>
      <div className="overflow-auto h-[65vh] msgs">
        <div className="flex justify-center">
          <div className="rounded-xl text-center font-bold bg-gray-300 p-3 text-sm mt-4">
            Note : Chat Gpt is intergrated for the responses , here chat gpt
            works as a customer and you can try chatting with it
          </div>
        </div>
        {userMessages[id as string] &&
          userMessages[id as string].history.length > 0 &&
          !userMessages[id as string].error &&
          userMessages[id as string].history.map((msg, index) => (
            <div
              key={index}
              ref={(el) => {
                if (index === userMessages[id as string].history.length - 1) {
                  el?.scrollIntoView();
                }
              }}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              } items-end m-4 gap-2 `}
            >
              {msg.role === "assistant" && (
                <div
                  className={`border min-w-[25px] h-[25px] rounded-[25px] text-white flex items-center justify-center text-xs ${
                    userDetails.name[0].toUpperCase() === "L"
                      ? "bg-[#8C8FED]"
                      : "bg-[#D63A5A]"
                  }`}
                  style={{ fontWeight: 700 }}
                >
                  {userDetails.name[0].toUpperCase()}
                </div>
              )}
              <div className="border p-3 rounded-lg border-black">
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div
                  className={`border min-w-[25px] h-[25px] rounded-[25px] text-white flex items-center justify-center text-xs bg-pink-500`}
                  style={{ fontWeight: 700 }}
                >
                  U
                </div>
              )}
            </div>
          ))}
                {userMessages[id as string] && userMessages[id as string].error && (
        <div className="text-center my-5">{userMessages[id as string].error}</div>
      )}
      </div>

      <div className="absolute bottom-2 p-2 w-full">
        <div className="border rounded-md p-2 shadow-lg">
          <div className="flex items-center font-bold gap-1 mb-2">
            <MessageSquare size={12} /> <span className="text-xs">Chat</span>
            <ArrowDown size={12} />
          </div>
          <Textarea
            className="!outline-none !ring-0 !border-none !focus:outline-none !focus:ring-0 !focus:border-none shadow-none"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></Textarea>
          <div className="text-end mt-2">
            <Button size="sm" className="text-xs" onClick={handleMessage}>
              <ArrowRight /> Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenMessageBox;
