import Session from "./../models/session.model"
import User from "../models/user.model"
import { Schema } from "mongoose"
import moment from "moment"

export async function getDashboardData(id:Schema.Types.ObjectId) {
    const tag = `[dashboard.library.ts][getDashboardData]`
    const currentYear = new Date().getFullYear()
    const months = moment.months()

    const foundUser = await User.findById(id)
    let sessions = []
    let userInfo:any = {}

    if(foundUser)
    switch (foundUser.userType) {
        case "Therapist":
            sessions = await Session.find({therapist: id}).limit(10).lean()
            userInfo = await User.findById(id)
            break
        case "Administrator":
            sessions = await Session.find({}).limit(10).lean()
            userInfo = await User.findById(id)
            break
        case "Client":
            sessions = await Session.find({client: id}).limit(10).lean()
            userInfo = await User.findById(id).populate("therapist")
            break
        default:
            console.log(`${tag} Unusual user type: ${foundUser.userType}`)
            throw Error(`${tag} Unusual user type: ${foundUser.userType}`)
    }
    else throw Error(`${tag} This should not happen; user with id: ${id} was not found`)
    

    const sessionsPerMonth = await Session.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(`${currentYear}-01-01`),
                    $lt: new Date(`${currentYear + 1}-01-01`),
                },
            },
        },
        {
            $group: {
                _id: { $month: "$createdAt" },
                sessionCount: { $sum: 1 },
            },
        },
        {
            $sort: { _id: 1 },
        },
        {
            $project: {
                month: "$_id",
                sessionCount: 1,
                _id: 0,
            },
        },
    ]);

    let seen = new Set
    let seenMap = new Map
    let result = []
    for (let i=0; i<sessionsPerMonth.length; i++){
        seen.add(sessionsPerMonth[i].month)
        seenMap.set(sessionsPerMonth[i].month, sessionsPerMonth[i].sessionCount)
    }

    for(let i=1; i<=12; i++){
        if (seenMap.has(i)){
           let value = seenMap.get(i)
           let item = {
            month: months[i-1],
            sessionCount: value
           }
           result.push(item)
        }else{
            let item = {
             month: months[i-1],
             sessionCount: 0
            }
            result.push(item)
        }
    }

    return {
        sessionsPerMonth: result,
        user: userInfo,
        sessions,
        totalRevenue: 2040,
        completedSessions: 15,
        upcomingSessions: 30,
        rejectedSessions: 2
    }

}