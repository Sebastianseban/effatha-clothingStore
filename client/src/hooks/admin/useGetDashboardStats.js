import { useQuery } from "@tanstack/react-query"
import { getDashboardStats } from "../../api/admin/getDashboardStatsApi"


export const useGetDashboardStats = () => {
    return useQuery({
        queryKey:['dashboard-stats'],
        queryFn:getDashboardStats

    })
}   