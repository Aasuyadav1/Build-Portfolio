"use client"
import React, { useState, useEffect } from 'react'
import InputAdmin from '@/components/AdminComponent/InputAdmin'

const Page = () => {
    const [formData, setFormData]: any = useState({
        title: "",
        description: "",
        image: "",
        technologies: "",
    })
    const [imagePreview, setImagePreview] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target instanceof HTMLInputElement && e.target.type === "file" && e.target.files) {
            const file = e.target.files[0] 
            setFormData({
                ...formData,
                image: file,
            })
            setImagePreview(URL.createObjectURL(file))
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            })
        }
        console.log(formData)
    }

    useEffect(() => {
        return () => {
            // Clean up the URL.createObjectURL to avoid memory leaks
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview)
            }
        }
    }, [imagePreview])

    return (
        <div className="w-full mt-2 border rounded-md p-4">
            <h1 className="text-2xl font-medium">Add New Project</h1>
            <div className="w-full mt-4 grid grid-cols-2 gap-x-6">
                <div className="flex flex-col gap-9">
                    <InputAdmin
                        label="Title"
                        placeholder="Enter project name"
                        onChange={handleChange}
                        value={formData.title}
                        name="title"
                    />
                    <InputAdmin
                        label="Description"
                        placeholder="Enter project description"
                        onChange={handleChange}
                        value={formData.description}
                        name="description"
                    />
                    <InputAdmin
                        label="Technologies"
                        placeholder="Enter project Tech stack"
                        onChange={handleChange}
                        value={formData.technologies}
                        name="technologies"
                    />
                </div>
                <div className="flex flex-col gap-9">
                    <InputAdmin
                        type='file'
                        label="Image"
                        placeholder="Upload project image"
                        onChange={handleChange}
                        name="image"
                        image={!!imagePreview}
                        imageUrl={imagePreview}
                    />
                </div>
            </div>
        </div>
    )
}

export default Page
