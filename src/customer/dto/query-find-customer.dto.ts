export class QueryFindCustomer {
    limit?: string;

    order?: 'asc' | 'desc' = 'asc';

    sort?: 'id' | 'email' | 'firstName' | 'lastName' = 'id';
}
