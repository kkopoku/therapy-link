"use client"

import React, { useState } from "react";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import { useSession, signOut } from "next-auth/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { getCreditsPrice, buyCredits, submitOTP, checkTransactionStatus } from "./page.functions";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { useRouter } from "next/navigation";


export default function PlanPage(){

    const { data: session } = useSession()
    const user = session?.user
    const [amount, setAmount] = useState('')
    const [error, setError] = useState('')
    const [stage, setStage] = useState<number>(1)
    const [price, setPrice] = useState('')
    const [momoNumber, setMomoNumber] = useState("")
    const [momoNetwork, setMomoNetwork] = useState("MTN")
    const [OTP, setOTP] = useState<string>("")
    const [transactionId ,setTransactionId] = useState<string>("")
    const [paymentSuccessful, setPaymentSuccessful] = useState<boolean>(false)
    const momoNetworks = [
        { name: "MTN"},
        { name: "Telecel"},
        { name: "AirtelTigo"},
    ]
    const router = useRouter()

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        if (parseInt(amount) <= 0) {
            setError('Please enter a positive number')
            setAmount('')
            return
        }

        if (!session) {
            toast.error("Something went wrong")
            console.log("No session")
            return
        }

        try{
            const response = await getCreditsPrice(session.user.token, +amount)
            const { currency, price, momoNetwork, momoNumber } = response
            setPrice(`${currency} ${price}`)
            setMomoNetwork(momoNetwork)
            setMomoNumber(momoNumber)
        }catch(e:any){
            setError(e.message)
            return
        }

        setStage((stage:any)=> ++stage )
  }

  const handleConfirmation = async(e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if(!momoNumber || !momoNetwork){
        toast.error("Kindly fill all fields")
        return
    }

    if (!session) {
        toast.error("Something went wrong")
        console.log("No session")
        return
    }

    try{
        const response = await buyCredits(session.user.token, Number(amount))
        const { data } = response

        const { step, id } = data.transaction

        setTransactionId(id)
        if (step === "OTP"){
            setStage((stage)=>++stage)
        }else{
            setStage((stage)=>stage+2)
        }

    }catch(e:any){
        toast.error(e.message)
        return
    }
  }

  const handleOTP = async(e: React.FormEvent) => {
    e.preventDefault()

    if(!session) {
        console.log("No session")
        toast.error("Something went wrong please try again")
        return
    }

    try{
        await submitOTP(session.user.token, transactionId, OTP)
        toast.success("OTP submitted successfully")
    }catch(e:any){
        toast.error(e.message)
        return
    }

    setStage((stage)=>++stage)
  }

  const handlePaymentCheck = async () => {
    console.log("handlePaymentCheck")

    if(!session) {
        toast.error("Something went wrong please try again")
        return
    }

    const { token } = session.user

    try{
        const response = await checkTransactionStatus(token, transactionId)
        const { status } = response.data

        if(status === "success"){
            toast.success("Your debit is successful, redirecting ...")
            setPaymentSuccessful(true)
            await new Promise((resolve:any)=>{
                setTimeout(()=>{
                  router.replace("/sessions/book")
                  resolve()
                }, 2000)
            })
        }else{
            toast.error("Debit not successful yet")
        }

    }catch(e:any){
        toast.error(e.message)
    }
  }

    return (
        <AuthenticatedLayout pageName="Plan" navFunctionName="sign out" navFunction={()=>signOut({callbackUrl:"/auth/login"})} sideBarFocus="Plan">
            <Toaster />
            {(stage == 1) && <div className="flex flex-grow w-full items-center">
                <Card className="w-full max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>Purchase Credits</CardTitle>
                        <CardDescription>Enter the amount of credits you want to buy</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="amount">Amount of Credits</Label>
                            <Input 
                                id="amount" 
                                type="number"
                                placeholder="Enter amount" 
                                value={amount}
                                required
                                onChange={(e) => {
                                    setError("")
                                    setAmount(e.target.value)
                                }}
                            />
                            </div>
                            {error && <p className="text-sm text-red-500">{error}</p>}
                        </div>
                        </CardContent>
                        <CardFooter>
                        <Button type="submit" className="w-full bg-primaryGreen hover:bg-secondaryGreen">Buy Credits</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>}

            {(stage == 2) && <div className="flex flex-grow w-full items-center">
                <Card className="w-full max-w-md mx-auto">
                    <button onClick={()=>{
                        setStage((stage)=>--stage)
                    }}>back</button>
                    <CardHeader>
                        <CardTitle>Purchase Credits</CardTitle>
                        <CardDescription>Enter the amount of credits you want to buy</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleConfirmation}>
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="amount">Credits Requested</Label>
                                    <Input 
                                        id="amount" 
                                        type="number" 
                                        value={amount}
                                        disabled
                                        className="bg-slate-200 text-black"
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="amount">You Pay</Label>
                                    <Input 
                                        id="amount" 
                                        type="text"  
                                        value={price}
                                        disabled
                                        className="bg-slate-200 text-black"
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="amount">Mobile Money Number</Label>
                                    <Input 
                                        id="momoNumber" 
                                        type="text" 
                                        value={momoNumber}
                                        onChange={(e)=>setMomoNumber(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="amount">Select Momo Network</Label>
                                    <div className="flex flex-row justify-between gap-x-5">
                                        {momoNetworks.map((item:any, index)=> (
                                            <button type="button" key={String(index)} className={`${momoNetwork !== item.name ? 'border border-primaryGreen text-black' : 'bg-primaryGreen text-white'} rounded-lg py-2 w-full text-xs text-center`}
                                                onClick={()=>setMomoNetwork(item.name)}>{item.name}</button>
                                        ))}
                                    </div>
                                </div>
                                {error && <p className="text-sm text-red-500">{error}</p>}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full bg-primaryGreen hover:bg-secondaryGreen">Confirm Purchase</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>}

            {(stage === 3) &&
                <div className="flex flex-grow w-full items-center">
                    <Card className="w-full max-w-md mx-auto">
                        <button onClick={()=>{
                            setStage((stage)=>--stage)
                        }}>back</button>
                        <CardHeader>
                            <CardTitle>Purchase Credits</CardTitle>
                            <CardDescription>Enter OTP to confirm payment</CardDescription>
                        </CardHeader>
                        <form onSubmit={handleOTP}>
                            <CardContent>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="amount">Enter OTP</Label>
                                        <Input 
                                            id="OTP" 
                                            type="number" 
                                            value={OTP}
                                            onChange={(e)=>setOTP(e.target.value)}
                                        />
                                    </div>
                                    {error && <p className="text-sm text-red-500">{error}</p>}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" className="w-full bg-primaryGreen hover:bg-secondaryGreen">Confirm OTP</Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            }

            {(stage === 4) &&
                <div className="flex flex-grow w-full items-center">
                    <Card className="w-full max-w-md mx-auto">
                        <CardHeader>
                            <CardTitle>Purchase Credits</CardTitle>
                            <CardDescription>Your payment is being processed</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            {!paymentSuccessful && <LoadingSpinner show size={40} border={5}/>}
                            {paymentSuccessful && <div className="flex h-20 bg-green-100 w-full border border-slate-400 border-dashed rounded-sm text-sm font-medium p-1 items-center text-green-500 justify-center">
                                <div>Your payment of {price} is successful</div>
                            </div>}
                        </CardContent>
                        <CardFooter>
                            {!paymentSuccessful && <Button type="button" onClick={handlePaymentCheck}
                                className="w-full bg-primaryGreen hover:bg-secondaryGreen">
                                I have made payment
                            </Button>}
                        </CardFooter>
                    </Card>
                </div>
            }

        </AuthenticatedLayout>
    )
}