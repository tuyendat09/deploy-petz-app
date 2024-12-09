import ChartDashboard from "./ChartDashboard/ChartDashboard"
import Tables from "./Tables/Tables"
import Stats from "./Stats/Stats"

export default function Dashboard() {
    return (
        <>
            <ChartDashboard />
            <Stats />
            <Tables />
        </>
    )
}