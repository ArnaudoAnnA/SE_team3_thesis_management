class ThesisRequest {
    constructor(title, description, teacherId, studentId, requestDate, approvalDate, approved, type, programmes, notes, coSupervisors){
        this.title = title;
        this.description = description;
        this.teacherId = teacherId;
        this.studentId = studentId;
        this.requestDate = requestDate;
        this.approvalDate = approvalDate;
        this.approved = approved;
        this.type = type;
        this.programmes = programmes;
        this.notes = notes;
        this.coSupervisors = coSupervisors;
    }
}

export default ThesisRequest