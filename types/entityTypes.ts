export interface EventDetails {
    eventId: number;
    eventName: string;
    eventType: string;
    organizer: string;
    organizerId?: number | null;
    dateAdded: string;
    startingDate?: string | null;
    coverImageLink?: string | null;
    eventDescription?: string | null;
    isApproved: boolean;
    status: string;
}

export interface EventStatus {
    isApproved: boolean;
    isDisapproved: boolean;
    isStarted: boolean;
    isCompleted: boolean;
}

export interface SessionDetails {
    sessionId: number;
    sessionNumber: number;
    venue: string;
    date: string;
    startingTime: string;
    endingTime: string;
    status: string;
}

export interface Session {
    id:number;
    venue:string;
    date:string;
    startTime:string;
    endTime:string;
}

export interface OrganizerDetails {
    id: number;
    name: string;
    nic: string;
    companyName ?:string;
    email: string;
    password ?: string;
    phone: string;
    pendingApproval: boolean;
    isApproved: boolean;
    isDisapproved: boolean;
}

export interface OrganizerStatus {
    pendingApproval:boolean;
    isApproved:boolean;
    isDisapproved:boolean;
}


