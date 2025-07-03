import { useMutation } from "@tanstack/react-query"
import { AddToCart } from "../../api/user/addToCartApi"


export const useAddToCart = () => {
    return useMutation({
        mutationFn:AddToCart
    })
}