import { DataTable, type Column } from '@/components/shared/components/DataTable'
import { ViewIcon } from '@/components/shared/icons/View'
import { Button } from '@/components/ui/button'

type CaseData = {
    id: number
    code: string
    autoNumber: string
    case: string
    problemCause: string
    problem: string

}

const data: CaseData[] = [
    {
        id: 1,
        code: "#6341",
        autoNumber: "#6341",
        case: "سرقة",
        problemCause: "تاخر السداد الشهري",
        problem: "دفع متأخر"
    },
    {
        id: 2,
        code: "#6342",
        autoNumber: "#6342",
        case: "سرقة",
        problemCause: "تاخر السداد الشهري",
        problem: "دفع متأخر"
    },
    {
        id: 3,
        code: "#6343",
        autoNumber: "#6343",
        case: "سرقة",
        problemCause: "نقص المستندات",
        problem: "توكيل ناقص"
    },
    {
        id: 4,
        code: "#6344",
        autoNumber: "#6344",
        case: "سرقة",
        problemCause: "نقص المستندات",
        problem: "معلقة"

    },
    {
        id: 5,
        code: "#6345",
        autoNumber: "#6345",
        case: "سرقة",
        problemCause: "نقص المستندات",
        problem: "معلقة"

    },
]

const getProblemStyles = (problem: string) => {
    switch (problem) {
        case "دفع متأخر":
            return "bg-[#C60000]/20 text-[#C60000]";
        case "توكيل ناقص":
            return "bg-[#5570F1]/20 text-[#5570F1]";
        default:
            return "bg-[#937F12]/20 text-[#937F12]";
    }
};

const columns: Column<CaseData>[] = [
    {
        header: "#",
        accessor: "id",
    },
    {
        header: "كود القضية",
        accessor: "code",
    },
    {
        header: "الرقم الآلي",
        accessor: "autoNumber",
    },
    {
        header: "القضية",
        accessor: "case",
    },

    {
        header: "نوع المشكلة",
        accessor: (item) => (
            <span
                className={`px-3.5 py-1.5 rounded-main text-xs font-medium whitespace-nowrap ${getProblemStyles(
                    item.problem
                )}`}
            >
                {item.problem}
            </span>
        ),
    },
    {
        header: "سبب المشكلة",
        accessor: "problemCause",
    },
    {
        header: "إجراء",
        accessor: () => (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 bg-blue-50 rounded-md hover:bg-blue-100">
                <ViewIcon className="w-4 h-4" />
            </Button>
        ),
    },
]


export const TableIncompleteProcedures = () => {
    return (
        <DataTable
            data={data}
            columns={columns}
            rowIdField="id"
        />
    )
}
