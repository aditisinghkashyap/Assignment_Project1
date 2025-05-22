import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { RootState } from "@/store";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPrompt,
  aiResponseFailed,
  aiResponseSuccess,
} from "./redux/sliceAiResponse";
import axios from "axios";

const AiBox = () => {
  const dispatch = useDispatch();
  const [prompt, setPrompt] = useState("");
  const [selected, setSelected] = useState("ai");
  const aiResponse = useSelector((state: RootState) => state.reducerAiResponse);

  async function apiResponseFunc(body: { role: string; content: string }) {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [...aiResponse.response, body],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );
      dispatch(
        aiResponseSuccess({
          role: "assistant",
          content: response.data.choices[0].message.content,
        })
      );
    } catch (err) {
      dispatch(aiResponseFailed("something went wrong"));
    }
  }
  function handleSubmit() {
    if (prompt.trim().length === 0) {
      return;
    }
    setPrompt("");
    dispatch(addPrompt({ role: "user", content: prompt }));
    apiResponseFunc({ role: "user", content: prompt });
  }
  return (
    <SheetContent>
      <SheetHeader className="hidden">
        <SheetTitle className="hidden sr-only">Ai bot</SheetTitle>
        <SheetDescription style={{ display: "none" }}>
          this is an ai bot
        </SheetDescription>
      </SheetHeader>
      <div>
        <div className="flex gap-2 border-b cursor-pointer shadow-md">
          <div
            onClick={() => setSelected("ai")}
            className={`p-3 ${
              selected === "ai" && "border-b"
            } text-md font-bold`}
            style={{
              borderBottomColor: selected === "ai" ? "blue" : "",
            }}
          >
            Ai
          </div>
          <div
            onClick={() => setSelected("details")}
            className={`p-3 ${
              selected === "details" && "border-b"
            } text-md font-bold`}
            style={{
              borderBottomColor: selected === "details" ? "blue" : "",
            }}
          >
            Details
          </div>
        </div>
        <div>
          {selected === "ai" ? (
            <div className=" h-[92.9vh] bg-gradient-to-t from-pink-200 to-blue-200 relative">
              <div className=" h-[80.9vh] font-bold p-2 overflow-auto msgs">
                {aiResponse.response.length > 0 ? (
                  aiResponse.response.map((item, index) => (
                    <div
                      key={index}
                      ref={(el) => {
                        if (index === aiResponse.response.length - 1)
                          el?.scrollIntoView();
                      }}
                      className={`${
                        item.role === "user" ? "justify-end" : "justify-start"
                      } flex mb-4`}
                    >
                      <div>
                        <div className="text-xs mb-1">
                          {item.role === "assistant" ? "Ai" : "you"}
                        </div>
                        <div className="bg-white p-2 rounded-lg">
                          {item.content}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center items-center h-full">
                    Hi , Ask me anything
                  </div>
                )}
                <div className="absolute bottom-0 w-[95%] p-1 rounded-lg shadow-lg bg-white m-2 flex gap-2 items-center">
                  <Input
                    className="!outline-none !ring-0 !border-none !focus:outline-none !focus:ring-0 !focus:border-none"
                    placeholder="Please type you question here"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <Button
                    className="rounded-[30px] h-[30px] w-[30px] bg-white hover:text-black hover:bg-white cursor-pointer"
                    onClick={handleSubmit}
                  >
                    <ArrowUp color="black" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-2">
              <div className="font-bold">Chat Gpt 4o - mini</div>
              <div> Here , the reponse are given by chatgpt api</div>
              <div>
                <span className="font-bold">
                  Note : If you are unable to get any response , there is a
                  strong chance that we have reached the api call limits. Sorry
                  for the inconvenience caused!
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </SheetContent>
  );
};

export default AiBox;
