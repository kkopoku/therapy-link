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
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { LogOut, Search, UserPlus, Check, X } from 'lucide-react'
import { useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

interface AdminViewComponentProps {
    items: { key: string, label: string }[];
    clientDetails: any;
    loading: boolean;
}

// Mock therapist data
const therapists = [
    {
        id: '1',
        name: 'Dr. Emily Smith',
        specialty: 'Anxiety & Depression',
        availability: 'Mon, Wed, Fri',
        image: '/placeholder.svg'
    },
    {
        id: '2',
        name: 'Dr. Michael Chen',
        specialty: 'Relationship Counseling',
        availability: 'Tue, Thu, Sat',
        image: '/placeholder.svg'
    },
    {
        id: '3',
        name: 'Dr. Sarah Johnson',
        specialty: 'Trauma & PTSD',
        availability: 'Mon, Thu, Fri',
        image: '/placeholder.svg'
    }
]

export const AdminViewComponent: React.FC<AdminViewComponentProps> = ({ items, clientDetails, loading }) => {

    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null)

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
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle>Assigned Therapist</CardTitle>
                                        <CardDescription>Manage client&apos;s therapist assignment</CardDescription>
                                    </div>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="gap-2">
                                                <UserPlus className="h-4 w-4" />
                                                Assign Therapist
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[500px]">

                                            <DialogHeader>
                                                <DialogTitle>Assign a Therapist</DialogTitle>
                                                <DialogDescription>
                                                    Select a therapist to assign to this client
                                                </DialogDescription>
                                            </DialogHeader>

                                            <div className="space-y-4 py-4">

                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        placeholder="Search therapists..."
                                                        className="flex-1"
                                                    />
                                                    <Select>
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Specialty" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="anxiety">Anxiety & Depression</SelectItem>
                                                            <SelectItem value="relationships">Relationship Counseling</SelectItem>
                                                            <SelectItem value="trauma">Trauma & PTSD</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="space-y-2">
                                                    {therapists.map((therapist) => (
                                                        <div
                                                            key={therapist.id}
                                                            className={`p-4 rounded-lg border transition-colors cursor-pointer ${selectedTherapist === therapist.id
                                                                ? 'border-[#2F4F4F] bg-[#2F4F4F]/5'
                                                                : 'hover:border-gray-300'
                                                                }`}
                                                            onClick={() => setSelectedTherapist(therapist.id)}
                                                        >
                                                            <div className="flex items-center gap-4">
                                                                <Avatar>
                                                                    <AvatarImage src={therapist.image} />
                                                                    <AvatarFallback>
                                                                        {therapist.name.split(' ').map(n => n[0]).join('')}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div className="flex-1">
                                                                    <h4 className="font-medium">{therapist.name}</h4>
                                                                    <p className="text-sm text-gray-500">{therapist.specialty}</p>
                                                                </div>
                                                                <Badge variant="outline">{therapist.availability}</Badge>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                            </div>

                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {selectedTherapist ? (
                                    <div className="flex items-center gap-4 p-4 bg-[#2F4F4F]/5 rounded-lg">
                                        <Avatar>
                                            <AvatarImage src={therapists.find(t => t.id === selectedTherapist)?.image} />
                                            <AvatarFallback>
                                                {therapists.find(t => t.id === selectedTherapist)?.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <h4 className="font-medium">
                                                {therapists.find(t => t.id === selectedTherapist)?.name}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                {therapists.find(t => t.id === selectedTherapist)?.specialty}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline" className="gap-1" onClick={()=>console.log("remove clicked")}>
                                                <X className="h-4 w-4" />
                                                Remove
                                            </Button>
                                            <Button size="sm" className="gap-1">
                                                <Check className="h-4 w-4" />
                                                Confirm
                                            </Button>
                                        </div>
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