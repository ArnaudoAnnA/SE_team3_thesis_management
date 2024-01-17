import dayjs from 'dayjs';

export class Application {
    // constructor(studentId, thesisId, accepted = null, curriculum = null, date = dayjs.now()) {
    //     this.studentId = studentId;
    //     this.thesisId = Number(thesisId);
    //     this.accepted = accepted;
    //     this.curriculum = curriculum;
    //     this.date = date;
    //     this.teacherId = teacherId;
    //     this.thesisTitle = thesisTitle;
    // }
    constructor(applicationId = null, studentId, thesisId, accepted, curriculum, date = dayjs.now(), teacherId, thesisTitle){
        this.applicationId = applicationId
        this.studentId = studentId
        this.thesisId = thesisId
        this.accepted = accepted
        this.curriculum = curriculum
        this.date = date
        this.teacherId = teacherId
        this.thesisTitle = thesisTitle
    }

    /* property duplicated in an object => removed
    parse() {
        return {
            id: this.applicationId,
            studentId: this.studentId,
            thesisId: this.thesisId,
            accepted: this.accepted,
            curriculum: this.curriculum,
            date: this.date,
            teacherId: this.teacherId,
            thesisTitle: this.thesisTitle
        };
    };*/
    parse(filePath){
        return {
            id: this.applicationId,
            studentId: this.studentId,
            thesisId: this.thesisId,
            accepted: this.accepted,
            curriculum: filePath,
            date: this.date,
            teacherId: this.teacherId,
            thesisTitle: this.thesisTitle
        };
    }
}

export default Application;