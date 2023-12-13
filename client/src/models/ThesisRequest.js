class ThesisRequest {
    constructor(id, title, description, teacherId, studentId, requestDate, approvalDate, approved, type, programmes, notes){
        this.id = id;
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
    }
}

export default ThesisRequest