export interface NotificationI {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    type?: string;
    isRead: boolean;
    href?: string;
}
