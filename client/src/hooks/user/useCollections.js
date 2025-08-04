import {useQuery} from "@tanstack/react-query"
import {getColleactions} from "../../api/user/getColleactions.Api"

export const useCollections = () => {
    return useQuery({
        queryKey:["collections"],
        queryFn:getColleactions
    })
}