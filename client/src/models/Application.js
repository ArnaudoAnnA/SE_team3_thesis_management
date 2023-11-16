import dayjs from 'dayjs';

export class Application {
    constructor(studentId, thesisId, accepted = false, curriculum = null, date = dayjs.now()) {
        this.studentId = studentId;
        this.thesisId = Number(thesisId);
        this.accepted = accepted;
        this.curriculum = curriculum;
        this.date = date;
    }

    parse() {
        return {
            studentId: this.studentId,
            thesisId: this.thesisId,
            accepted: this.accepted,
            curriculum: this.curriculum,
            date: this.date
        };
    };
    parse(filePath){
        return {
            studentId: this.studentId,
            thesisId: this.thesisId,
            accepted: this.accepted,
            curriculum: filePath,
            date: this.date
        };
    }
}

export default Application;