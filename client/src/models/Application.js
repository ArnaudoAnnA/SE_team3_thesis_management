import dayjs from 'dayjs';

export default function Application (studentId, thesisId, accepted=false, curriculum=null, date=dayjs.now()) {
    this.studentId = studentId;
    this.thesisId = thesisId;
    this.accepted = accepted;
    this.curriculum = curriculum;
    this.date = date;
}