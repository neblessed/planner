import { MeetingType } from "../types/MeetingType";
import { SpendingType } from "../types/SpendingType";

const API_BASE = "http://localhost:3000/api";

export const api = {
    // GOAL
    getGoal: () => fetch(`${API_BASE}/goal`).then((res) => res.json()),
    updateGoal: (goal: number) =>
        fetch(`${API_BASE}/goal`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ goal }),
        }).then((res) => res.json()),

    // SPENDINGS
    getSpendingById: (id: number) =>
        fetch(`${API_BASE}/spendings/${id}`).then((res) => res.json()),
    getSpendings: () =>
        fetch(`${API_BASE}/spendings`).then((res) => res.json()),
    createSpending: (spending: Omit<SpendingType, "id">) =>
        fetch(`${API_BASE}/spendings/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(spending),
        }).then((res) => res.json()),
    deleteSpending: (id: number) => {
        fetch(`${API_BASE}/spendings/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json());
    },

    // MEETINGS
    getMeetings: () => fetch(`${API_BASE}/meetings`).then((res) => res.json()),

    getMeeting: (id: number) =>
        fetch(`${API_BASE}/meetings/${id}`).then((res) => res.json()),

    createMeeting: (meeting: Omit<MeetingType, "id">) =>
        fetch(`${API_BASE}/meetings`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(meeting),
        }).then((res) => res.json()),

    updateMeeting: (id: number, meeting: Partial<Omit<MeetingType, "id">>) =>
        fetch(`${API_BASE}/meetings/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(meeting),
        }).then((res) => res.json()),

    deleteMeeting: (id: number) =>
        fetch(`${API_BASE}/meetings/${id}`, {
            method: "DELETE",
        }).then((res) => res.json()),
};
