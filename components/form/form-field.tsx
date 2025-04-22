"use client";
import {
    Control,
    Controller,
    FieldErrors,
    RegisterOptions,
} from "react-hook-form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

interface InputFieldProps {
    name: string;
    label?: string;
    type?: string;
    className?: string;
    placeholder?: string;
    required?: boolean;
    register: any;
    errors?: FieldErrors;
}

interface SelectFieldProps {
    control: Control<any>;
    required?: boolean;
    name: string;
    label?: string;
    placeholder?: string;
    className?: string;
    options: any[];
    errors?: FieldErrors<any>;
}

export const InputField = ({
    name,
    register,
    type,
    label,
    className,
    required,
    placeholder,
    errors,
}: InputFieldProps) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-300">
                {label}
            </label>
            <Input
                type={type}
                {...register(name)}
                required={required}
                placeholder={placeholder}
                className={cn(
                    `${
                        errors?.[name] ? "border-red-500" : "border-gray-500"
                    } bg-gray-700/50`,
                    className
                )}
            />

            {errors?.[name] && (
                <p className="text-red-500 text-sm">This field is required</p>
            )}
        </div>
    );
};

export const SelectField = ({
    name,
    control,
    required,
    label,
    placeholder,
    options,
    errors,
    className,
}: SelectFieldProps) => {
    return (
        <div className="space-y-2 w-full">
            <label className="block text-sm font-medium text-zinc-300">
                {label}
            </label>
            <Controller
                control={control}
                name={name}
                rules={{ required: required }}
                render={({ field }) => (
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <SelectTrigger
                            className={cn(
                                `${
                                    errors?.[name]
                                        ? "border-red-500"
                                        : "border-gray-400"
                                } bg-gray-700/50`,
                                className
                            )}
                        >
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((option: string) => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
            {errors?.[name] && (
                <p className="text-red-500 text-sm">This field is required</p>
            )}
        </div>
    );
};

export const InfluencerTextFields = [
    {
        name: "name",
        label: "Name of Influencer",
        type: "text",
        required: true,
    },
    {
        name: "email",
        label: "Email Address",
        type: "email",
        required: true,
    },
    {
        name: "phone",
        label: "Phone Number",
        type: "tel",
        required: true,
    },
    {
        name: "dateOfBirth",
        label: "Birth Date",
        type: "date",
        required: false,
    },
];

export const platforms = [
    "Instagram",
    "Tiktok",
    "Youtube",
    "Facebook",
    "Twitter",
    "Other",
];

// audience sizes
export const audienceSizes = [
    "5k+",
    "10k+",
    "20k+",
    "25k+",
    "50+",
    "100k+",
    "200k+",
    "250k+",
    "500k+",
    "750k+",
    "1M+",
    "2M+",
    "5M+",
    "10M+",
];

// Categories for filtering
export const creatorCategories = [
    "All Categories",
    "Fashion & Lifestyle",
    "Tech & Gaming",
    "Food & Cooking",
    "Fitness & Health",
    "Travel",
    "Comedy",
    "Beauty",
    "Music",
    "DIY & Crafts",
    "Sports",
    "Books & Literature",
    "Finance",
    "Motivation",
    "Photography",
    "Parenting",
    "Science & Education",
    "Fashion Design",
    "Adventure & Outdoors",
    "Wellness",
    "Automotive",
    "Plants & Gardening",
    "Business & Entrepreneurship",
    "Education",
    "Sustainability",
    "Pets & Animals",
    "Film & Entertainment",
    "Digital Art",
    "Aerial Photography",
    "Mental Health",
    "Street Art",
    "Yoga & Meditation",
    "Coffee & Beverages",
    "Interior Design",
    "Cryptocurrency",
    "Dance",
    "History",
];
