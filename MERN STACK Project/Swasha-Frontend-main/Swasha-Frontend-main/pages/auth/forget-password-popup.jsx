import { getPublicURL } from "../../util/UrlUtils";
import { useState } from "react";
import ImageLabelInput from "../../components/ImageLabelInput";
import { getResetPasswordEmail, makeRequest } from "../../util/ApiClient";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function ({setVisible}) {
  const [email, setEmail] = useState("");
  const [txt, setTxt] = useState();
  const router = useRouter();
  return (
    <div className="fixed inset-0 flex justify-center items-end md:items-center bg-opacity-25 backdrop-blur-[0.1rem]">
      <div
        className="flex flex-col bg-gray-100 rounded-xl items-center"
        //  style={{ width: "clamp(28rem, 30vw, 25rem)" }}
      >
        <div className="font-semibold text-xl ml-auto cursor-pointer pr-5 pt-2" onClick={()=>{setVisible(false)}}>x</div>
        <div className="px-12 pb-16 pt-4" style={{ width: "clamp(24rem, 30vw, 25rem)" }}>
        <div className="text-[1.7rem] mb-[1rem] font-semibold">
          Forgot Password
        </div>
        
        <ImageLabelInput
          imgsrc = {getPublicURL("/png/email.png")}
          label="Email ID"
          placeholder="Enter your Registered email address"
          autoComplete="email"
          type="email"
          value={email}
          setValue={setEmail}
        ></ImageLabelInput>
        <p>We will send authentication link to your mail</p>
        
        <button
          className="blue-button-2 w-full mt-2"
          onClick={(e) => {
            makeRequest(
              getResetPasswordEmail,
              { email },
              {
                onSuccess: (x) => {
                  toast("Email sent, check your mailbox");
                },
              }
            );
          }}
        >
          Get Email
        </button>
        {txt && <div>{txt}</div>}
      </div>
      </div>
      </div>
  );
}
