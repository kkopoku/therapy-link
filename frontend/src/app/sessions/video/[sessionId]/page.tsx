import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout"

export default function VideoPage(){
    return (
        <AuthenticatedLayout pageName="Video Chat">
            <div>Here is the video chat page !</div>
        </AuthenticatedLayout>
    )
}