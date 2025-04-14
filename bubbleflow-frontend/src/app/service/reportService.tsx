import api from './api';
import { Report } from './types';


export const xReportService = {
    // reports endpoints
    getXReport: () => {
        return api.get<Report>('/reports/x-report').then(res => res.data);
    },

    getXReportByDate: (date: string) => {
        return api.get<Report>(`/reports/x-report/date/${date}`).then(res => res.data);
    }
}