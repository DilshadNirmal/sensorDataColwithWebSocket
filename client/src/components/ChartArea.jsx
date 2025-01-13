import { MdOutlineCandlestickChart } from "react-icons/md";
import { AiOutlineAreaChart } from "react-icons/ai";
import { HiCamera } from "react-icons/hi";
import Chart from "./Chart";

const ChartArea = () => {
  return (
    <div className="bg-[#131313] text-[#fafafa] mx-4 my-8">
      <div className="flex items-center justify-between mx-4">
        <div className="flex items-center justify-between gap-16">
          <h2 className="text-3xl">CBTA1</h2>
          <div className="flex items-center justify-between gap-14">
            <p>
              Max Value &nbsp;{" "}
              <span className="text-accent font-bold text-xl">000</span>
            </p>
            <p>
              Min Value &nbsp;{" "}
              <span className="text-accent font-bold text-xl">000</span>
            </p>
            <p>
              Avg Value &nbsp;{" "}
              <span className="text-accent font-bold text-xl">000</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex gap-2 items-center border border-accent rounded-md p-1">
            <button className="bg-accent rounded-sm">
              <AiOutlineAreaChart className="w-6 h-6 " />
            </button>
            <button className="">
              <MdOutlineCandlestickChart className="w-6 h-6" />
            </button>
          </div>
          <div className="border border-accent rounded-md p-1">
            <HiCamera className="w-6 h-6" />
          </div>
          <button className="bg-accent p-2 rounded-md">Export</button>
        </div>
      </div>

      {/* chart area */}

      <Chart />
    </div>
  );
};

export default ChartArea;
