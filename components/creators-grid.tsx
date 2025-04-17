"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Creator, CreatorCard } from "@/components/creator-card";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { allCreators, creatorCategories } from "@/data/creators";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { a } from "framer-motion/dist/types.d-B50aGbjN";

interface CreatorsGridProps {
    dict: {
        title: string;
        subtitle: string;
    };
    creators?: Creator[];
}

export function CreatorsGrid({ dict, creators }: CreatorsGridProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [filteredCreators, setFilteredCreators] = useState(
        creators || allCreators
    );

    // Apply filters
    useEffect(() => {
        let results = creators && creators.length ? creators : allCreators;

        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            results = results.filter(
                (creator) =>
                    creator.name.toLowerCase().includes(term) ||
                    creator.bio.toLowerCase().includes(term) ||
                    creator.category.toLowerCase().includes(term)
            );
        }

        // Apply category filter
        if (selectedCategory !== "All Categories") {
            results = results.filter(
                (creator) => creator.category === selectedCategory
            );
        }

        setFilteredCreators(results);
    }, [searchTerm, selectedCategory]);

    // Use infinite scroll hook
    const {
        items: displayedCreators,
        isLoading,
        hasMore,
    } = useInfiniteScroll(filteredCreators, 18);

    const loadingRef = useRef<HTMLDivElement>(null);

    return (
        <section className="py-16  max-w-[1200px] mx-auto">
            <div className="container px-4 md:px-6 overflow-x-hidden overflow-hidden">
                {/* Header */}
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            type: "spring",
                            duration: 0.5,
                            ease: "easeOut",
                            bounce: 0.4,
                        }}
                        className="space-y-2 tracking-tight"
                    >
                        <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to bg-slate-50 text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
                            {dict.title}
                        </h1>
                        <p className="mx-auto max-w-[700px] text-muted dark:text-slate-100 md:text-xl">
                            {dict.subtitle}
                        </p>
                    </motion.div>
                </div>

                {/* Filters */}
                <div className="mb-10 grid gap-4 md:grid-cols-3">
                    {/* Search Input */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search creators..."
                            className="pl-10 bg-background/50"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Category Select */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Select
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                        >
                            <SelectTrigger className="pl-10 bg-background/50">
                                <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All Categories">
                                    {/* All Categories */}
                                </SelectItem>
                                {creatorCategories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Count */}
                    <div className="text-sm text-muted-foreground flex items-center justify-end">
                        Showing{" "}
                        {Math.min(
                            displayedCreators.length,
                            filteredCreators.length
                        )}{" "}
                        of {filteredCreators.length} creators
                    </div>
                </div>

                {/* Creators Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {filteredCreators &&
                        filteredCreators.map((creator, index) => (
                            <CreatorCard
                                key={creator.id}
                                creator={creator}
                                index={index}
                            />
                        ))}
                </div>

                {/* Loading Spinner */}
                {isLoading && (
                    <div ref={loadingRef} className="flex justify-center mt-8">
                        <div className="w-10 h-10 border-4 border-brand/30 border-t-brand rounded-full animate-spin"></div>
                    </div>
                )}

                {/* No results */}
                {filteredCreators.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">
                            No creators found matching your search criteria.
                        </p>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("All Categories");
                            }}
                        >
                            Clear filters
                        </Button>
                    </div>
                )}

                {/* Optional Load More */}
                {hasMore && !isLoading && (
                    <div className="flex justify-center mt-8">
                        <Button
                            variant="outline"
                            className="border-brand text-brand hover:bg-brand hover:text-white"
                            onClick={() => {
                                if (loadingRef.current) {
                                    loadingRef.current.scrollIntoView({
                                        behavior: "smooth",
                                    });
                                }
                            }}
                        >
                            Load more creators
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
