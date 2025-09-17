export interface EventDetails {
    eventId: number;
    eventName: string;
    eventType: string;
    organizer: string;
    organizerId?: number | null;
    dateAdded: string;
    startingDate?: string | null;
    dateCompleted?: string | null;
    coverImageLink?: string | null;
    eventDescription?: string | null;
    isApproved?: boolean;
    isPublished?:boolean;
    status?: string;
    earningsByEvent ?:number;
    totalProfit ?:number;
    commission ?:number;
    totalAttendeesCount ?:number;
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
    sessionNumber:string;
    venue:string;
    date:string;
    startTime:string;
    endTime:string;
    attendees:number;
    revenue:number;
    profit:number;
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

export interface SessionCardDetails {
    sessionId:number;
    sessionName:string;
    date:string;
    time:string;
    location:string;
    onBookNow:()=>void;
}

export interface CategoryDetails {
    id: number;
    category: string;
}

export interface TicketDetails {
    id?: number;
    ticketType:string;
    ticketPrice:number;
    ticketCount:number;
    soldCount?:number;
}

export interface CreateEventBody {
    eventName: string;
    startingDate: string;
    coverImageLink: string|null;
    description: string;
    eventCategoryId: number;
    organizerId: number;
    tickets: TicketDetails[];
}

export interface CreateSessionBody {
    venue:string;
    date:string;
    startTime:string;
    endTime:string;
    eventId:number;
}

export interface EarningDetails {
    totalEarnings:number;
    totalWithdrawals:number;
    currentBalance:number;
}

export interface CreateTransactionRequest {
    amount:number;
    organizerId:number;
}

export interface BookingDetails {
    bookingId:string;
    name:string;
    email:string;
    phone:string;
    nic:string;
}

export interface EventCategoryDetails {
    id:number;
    category:string;
}

export interface SessionCardDetails {
    sessionId: number;
    eventName: string;
    eventId: number;
    startingDate: string;
    eventAddedDate: string;
    startingTime: string;
    coverImageLink: string;
    location: string;
    categoryName: string;
    minTicketPrice: number;
}

export interface SessionTicketDetails {
    ticketId: number;
    sessionId: number;
    eventId: number;
    ticketType: string;
    initialTicketCount: number;
    remainingTicketCount: number;
    soldTicketCount: number;
}

export interface EventParticipationDetails{
    sessionId:number;
    sessionNumber:string;
    ticketDetails:SessionTicketDetails[];
}

