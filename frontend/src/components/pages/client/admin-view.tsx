import PrimaryInput from "@/components/inputs/PrimaryInput";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import { UserPlus, Check, X, Info } from 'lucide-react'
import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { AiFillEdit } from "react-icons/ai";
import toast from "react-hot-toast";

interface AdminViewComponentProps {
    items: { key: string, label: string }[];
    clientDetails: any;
    loading: boolean;
    session?: any;
}

interface Therapist {
    _id: string;
    firstName: string;
    otherNames: string;
    email?: string;
    primaryPhone?: string;
    availability?: string;
    specialty?: string;
}

interface AssignTherapistDialogProps {
    therapists: Therapist[];
    selectedTherapist: Therapist | null;
    setSelectedTherapist: Function;
    handleConfirmTherapist: () => void;
}

const API = `${process.env.NEXT_PUBLIC_API_URL}`

export const AdminViewComponent: React.FC<AdminViewComponentProps> = ({ items, clientDetails, loading, session }) => {

    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null)
    const [currentTherapist, setCurrentTherapist] = useState<Therapist | null>(null)
    const [therapistList, setTherapistList] = useState<Therapist[]>([])
    const [assignTherapistDialogOpen, setAssignTherapistDialogOpen] = useState(false)

    useEffect(()=>{
        setCurrentTherapist(clientDetails?.therapist)
    },[clientDetails])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                duration: 0.3
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    }

    const triggerFetchTherapist = async () => {
        if (!session) return
        try {
            const response = await fetch(`${API}/therapist`, {
                method: "GET",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.user.token}`
                }
            })
            let { data } = await response.json()

            if (!response.ok) {
                console.log(data)
                toast.error("Something went wrong")
                return
            }
            setTherapistList(data)
            setAssignTherapistDialogOpen(true)
        } catch (e: any) {
            console.log(e)
            toast.error("Something went wrong")
        }
    }

    const handleConfirmTherapist = async () => {
        if (!session) return
        if (selectedTherapist?._id === clientDetails?.therapist?._id) {
            toast("Therapist already assigned", { icon: <Info /> })
            return
        }
        try {
            const response = await fetch(`${API}/client/update`, {
                method: "PUT",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.user.token}`
                },
                body: JSON.stringify({ id: clientDetails._id, therapist: selectedTherapist?._id })
            })
            let { data } = await response.json()

            if (!response.ok) {
                console.log(data)
                toast.error("Something went wrong")
                return
            }
            toast.success("Therapist assigned successfully")
            setAssignTherapistDialogOpen(false)
            setCurrentTherapist(selectedTherapist)
        } catch (e: any) {
            console.log(e)
            toast.error("Something went wrong")
        }
    }

    return (
        <div className="flex flex-col w-full gap-y-10">
            <div className="grid grid-cols-5 w-full gap-x-5">

                <div className="flex flex-col col-span-2 font-extralight">
                    <span>Client Information</span>
                    <span className="text-xs">Details of the selected client</span>
                </div>

                <div className="flex flex-col col-span-3 w-full">
                    {loading ? (
                        <div className="grid grid-cols-2 gap-x-5 gap-y-3 animate-pulse">
                            <div className="bg-gray-200 h-12 rounded"></div>
                            <div className="bg-gray-200 h-12 rounded"></div>
                            <div className="bg-gray-200 h-12 rounded"></div>
                            <div className="bg-gray-200 h-12 rounded"></div>
                            <div className="bg-gray-200 h-12 rounded"></div>
                            <div className="bg-gray-200 h-12 rounded"></div>
                            <div className="bg-gray-200 h-12 rounded"></div>
                            <div className="bg-gray-200 h-12 rounded"></div>
                            <div className="bg-gray-200 h-12 rounded"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                            {items.map((item, idx) =>
                                <div className="lg:col-span-1 col-span-2" key={idx}>
                                    <PrimaryInput label={item.label} value={clientDetails ? clientDetails[item.key] : 'N/A'} disabled />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-5 w-full gap-x-5">

                <div className="flex flex-col col-span-2 font-extralight">
                    <span>Client Current Therapist</span>
                    <span className="text-xs">Details of the selected client Therapist</span>
                </div>

                <div className="flex flex-col col-span-3 w-full">
                    {/* Therapist Matching Card */}
                    <motion.div variants={itemVariants}>
                        <Card className="border-slate-400">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle>Assigned Therapist</CardTitle>
                                        <CardDescription>Manage client&apos;s therapist assignment</CardDescription>
                                    </div>
                                    <Dialog open={assignTherapistDialogOpen} onOpenChange={setAssignTherapistDialogOpen}>
                                        {(!clientDetails?.therapist) &&
                                            <Button className="gap-2 hover:bg-secondaryGreen bg-primaryGreen" onClick={triggerFetchTherapist}>
                                                <UserPlus className="h-4 w-4" />
                                                Assign Therapist
                                            </Button>
                                        }
                                        <AssignTherapistDialog selectedTherapist={selectedTherapist} therapists={therapistList} setSelectedTherapist={setSelectedTherapist} handleConfirmTherapist={() => handleConfirmTherapist()} />
                                    </Dialog>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {currentTherapist ? (
                                    <div className="flex items-center gap-4 p-4 bg-[#2F4F4F]/5 rounded-lg">
                                        <Avatar>
                                            <AvatarFallback className="bg-slate-300">
                                                {currentTherapist?.firstName[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <h4 className="font-medium">
                                                {currentTherapist?.firstName}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                {currentTherapist?.otherNames}
                                            </p>
                                        </div>
                                        {(typeof currentTherapist !== "object") ?
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline" className="gap-1" onClick={() => setSelectedTherapist(null)}>
                                                    <X className="h-4 w-4" />
                                                    Cancel
                                                </Button>
                                                <Button size="sm" className="gap-1">
                                                    <Check className="h-4 w-4" />
                                                    Confirm
                                                </Button>
                                            </div>
                                            :
                                            <Button size="sm" className="gap-1" onClick={triggerFetchTherapist}>
                                                <AiFillEdit className="h-4 w-4" />
                                                Change
                                            </Button>
                                        }
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        No therapist assigned yet
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>

    );
}


const AssignTherapistDialog: React.FC<AssignTherapistDialogProps> = ({ therapists, selectedTherapist, setSelectedTherapist, handleConfirmTherapist }) => {

    const [search, setSearch] = useState("")
    const [filteredTherapistList, setFilteredTherapistList] = useState<Therapist[]>([])

    useEffect(() => {
        setFilteredTherapistList(therapists)
    },[therapists])

    const handleSearch = (e: any) => {
        setSearch(e.target.value)
        if (e.target.value === "") {
            setFilteredTherapistList(therapists)
        } else {
            setFilteredTherapistList(therapists.filter((therapist) => therapist.firstName.toLowerCase().includes(e.target.value.toLowerCase())))
        }
    }

    return (
        <DialogContent className="sm:max-w-[550px] sm:min-h-[300px]">
            <DialogHeader>
                <DialogTitle>Assign a Therapist</DialogTitle>
                <DialogDescription>
                    Select a therapist to assign to this client
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Search therapists..."
                        className="flex-1"
                        onChange={handleSearch}
                        value={search}
                    />
                </div>

                {therapists?.length > 0 ? <div className="space-y-2 overflow-scroll max-h-64 md:max-h-96">
                    {filteredTherapistList.map((therapist) => (
                        <div
                            key={therapist._id}
                            className={`px-2 py-1 max-h-14 rounded-lg border transition-colors cursor-pointer ${selectedTherapist?._id === therapist._id
                                ? 'border-[#2F4F4F] bg-[#2F4F4F]/5'
                                : 'hover:border-gray-300'
                                }`}
                            onClick={() => {
                                console.log("currentT", therapist)
                                console.log("selectedT", selectedTherapist)
                                setSelectedTherapist(therapist)
                            }}
                        >
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarFallback className="text-xs">
                                        {therapist.firstName[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <h4 className="font-medium">{therapist.firstName}</h4>
                                    <p className="text-sm text-gray-500">{therapist.specialty}</p>
                                </div>
                                <Badge variant="outline">{therapist.availability}</Badge>
                            </div>
                        </div>
                    ))}
                </div> :
                    <div className="text-center py-8 text-gray-500">No Therapists Available</div>}
            </div>
            <Button onClick={handleConfirmTherapist}>
                <Check className="h-4 w-4" />
                Confirm
            </Button>
        </DialogContent>
    );
};