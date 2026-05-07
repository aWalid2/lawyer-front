type CaseSummaryCardProps = {
  caseData: {
    case_title: string;
    reference_number: string;
    client: {
      first_name: string;
      id: number;
    };
  };
};

export const CaseSummaryCard = ({ caseData }: CaseSummaryCardProps) => {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-[20px] bg-[radial-gradient(circle,rgba(21,59,77,0.5)_0%,rgba(21,59,77,1)_100%)] p-6 text-center text-white shadow-lg">
      <h2 className="mb-1 text-base font-bold">{caseData.case_title}</h2>
      <p className="mb-1 text-[10px] font-normal">
        <span className="text-[#F8F8F8]">الرقم الآلي للقضية:</span>{" "}
        <span className="font-extrabold text-white">
          {caseData.reference_number}
        </span>
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2 text-[11px]">
        <p className="mb-1 text-[10px] font-normal">
          <span className="text-[#F8F8F8]">الموكل:</span>{" "}
          <span className="font-extrabold text-white">
            {caseData.client.first_name}
          </span>
        </p>
        <p className="mb-1 text-[10px] font-normal">
          <span className="text-[#F8F8F8]">كود الموكل:</span>{" "}
          <span className="font-extrabold text-white">
            {caseData.client.id}
          </span>
        </p>
      </div>
    </div>
  );
};
