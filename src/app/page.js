import PromptInput from "@/components/PromptInput";
import ResChatGpt from "@/components/ResChatGpt";

export default function Home() {
  const res = false
  const auth = false
  return (
    <div className="relative flex "  >

      {auth ? <div className="absolute z-20 lg:relative bg-green-400  h-[90dvh] w-[300px] " >
        menu
      </div> : null}

      <div className={`flex-1  ${auth ? "" : "mx-auto"} `} >

        <div className={` relative  max-w-[1024px] mx-auto   h-[90dvh] flex flex-col items-center justify-center `}   >

          <div>
            <div>
              {res ? <ResChatGpt /> : <h1>What can I help with?</h1>}
            </div>

          </div>

          <div className={` ${res ? " absolute bottom-2   " : ""} `} >
            <PromptInput />
          </div>

        </div>


      </div>


      {/* <h1 className="text-center" >MixGpt can make mistakes. Check important info</h1> */}
    </div>
  );
}
