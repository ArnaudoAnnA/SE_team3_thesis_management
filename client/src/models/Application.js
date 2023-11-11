import dayjs from 'dayjs';

export default function Application (studentId, thesisId, accepted=false, curriculum=null, date=dayjs.now()) {
    this.studentId = studentId;
    this.thesisId = thesisId;
    this.accepted = accepted;
    this.curriculum = curriculum;
    this.date = date;

    this.parse = function () {
        return {
            studentId: this.studentId,
            thesisId: this.thesisId,
            accepted: this.accepted,
            curriculum: this.curriculum,
            date: this.date
        }
    }
}