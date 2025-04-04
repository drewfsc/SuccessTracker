"use client"
export let defaultValue
= undefined;

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {getLastSixMonthsLabel} from "@/lib/utils";
const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
]

const chartConfig = {
    desktop: {
        label: "Clients",
        color: "hsl(var(--chart-4))",
    },
}

export function BarChartt({metrics}) {
    console.log(metrics)
    return (
        <div className={`border`}>
            <CardHeader>
                <CardTitle>Regions</CardTitle>
                <CardDescription>{getLastSixMonthsLabel()}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="region"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            {/*<CardFooter className="flex-col items-start gap-2 text-sm">*/}
            {/*    <div className="flex gap-2 font-medium leading-none">*/}
            {/*        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />*/}
            {/*    </div>*/}
            {/*    <div className="leading-none text-muted-foreground">*/}
            {/*        Showing total visitors for the last 6 months*/}
            {/*    </div>*/}
            {/*</CardFooter>*/}
        </div>
    )
}
