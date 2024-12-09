import BarChart from "./BarChart/BarChart"
import LineChart from "./LineChart/LineChart"

export default function ChartDashboard() {
    return (
        <div className="flex justify-between items-center gap-6">
            <BarChart />
            <LineChart />
        </div>
    )
}