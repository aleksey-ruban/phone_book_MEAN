export interface Contact {
    _id?: string; // Опциональный, т.к. на момент создания объекта id может еще не быть
    name: string;
    email: string;
    phone: {
        mobile: string;
        work?: string;
    };
}
