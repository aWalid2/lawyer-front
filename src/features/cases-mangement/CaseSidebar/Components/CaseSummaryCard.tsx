type CaseSummaryCardProps = {
  caseData: {
    case_title: string;
    case_sequence: string;
    client: {
      first_name: string;
      id: number;
    };
  };
};

export const CaseSummaryCard = ({ caseData }: CaseSummaryCardProps) => {
  return (
    <div className="bg-[radial-gradient(circle,rgba(21,59,77,0.5)_0%,rgba(21,59,77,1)_100%)] rounded-[20px] p-6 text-white text-center flex flex-col items-center gap-1.5 shadow-lg">
      <h2 className="text-base font-bold mb-1 ">{caseData.case_title}</h2>
      <p className="text-[10px] font-normal  mb-1">
        <span className="text-[#F8F8F8]">الرقم الآلي للقضية:</span>{" "}
        <span className="text-white font-extrabold">{caseData.case_sequence}</span>
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2 text-[11px]">
        <p className="text-[10px] font-normal  mb-1">
          <span className="text-[#F8F8F8]">الموكل:</span>{" "}
          <span className="text-white font-extrabold">
            {caseData.client.first_name}
          </span>
        </p>
        <p className="text-[10px] font-normal  mb-1">
          <span className="text-[#F8F8F8]">كود الموكل:</span>{" "}
          <span className="text-white font-extrabold">
            {caseData.client.id}
          </span>
        </p>
      </div>
    </div>
  );
};
