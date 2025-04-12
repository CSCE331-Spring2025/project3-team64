import api from './api';
import { Report } from './types';


export const xReportService = {
    // reports endpoints
    getXReport: () => {
        return api.get<Report[]>('/reports/x-report').then(res => res.data);
    },
}