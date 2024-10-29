import React from "react"
import UnauthenticatedLayout from "@/components/layouts/UnauthenticatedLayout"
import TopNavigation from "@/components/navigation/TopNavigation"
import BottomNavigation from "@/components/navigation/BottomNavigation"
import ComingSoon from "@/components/pages/ComingSoon"


export default function PricingPage(){
    return(
        <UnauthenticatedLayout>
            <ComingSoon />
        </UnauthenticatedLayout>
    )
}