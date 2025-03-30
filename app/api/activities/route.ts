import { type NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { ObjectId } from 'mongodb';

// GET activities, optionally filtered by clientId
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get("clientId")

    const collection = await getCollection("actions")

    let query = {}
    if (clientId) {
      query = { clientId }
    }

    const actions = await collection.find(query).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(actions, { status: 200 })
  } catch (error) {
    console.error("Error fetching activities:", error)
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 })
  }
}

// POST to add a new action
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const actionsCollection = await getCollection("actions")
    const clientsCollection = await getCollection("clients")

    // Add timestamp if not provided
    if (!body.createdAt) {
      body.createdAt = new Date().toISOString()
    }
    let user
    if (body.trackable) {
       user = await clientsCollection.updateOne({ _id: new ObjectId(body.clientId) }, { $set: { trackable: body.trackable }})
    }

    const result = await actionsCollection.insertOne(body)

    return NextResponse.json({ message: "Action added successfully", _id: result.insertedId, user }, { status: 201 })
  } catch (error) {
    console.error("Error adding action:", error)
    return NextResponse.json({ error: "Failed to add action" }, { status: 500 })
  }
}

