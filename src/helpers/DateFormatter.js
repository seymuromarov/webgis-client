import dayjs from 'dayjs'

export default {
    formatDate(date) {
        return dayjs(date).format("D MMMM YYYY");
    },
    formatDateTime(date) {
        return dayjs(date).format("HH:mm D MMMM YYYY");
    }
}