class ThesisRequest {
    constructor(id, title, description, supervisorId, coSupervisorIds, studentId, requestDate, approvalDate, accepted){
        this.id = id;
        this.title = title;
        this.description = description;
        this.supervisorId = supervisorId;
        this.coSupervisorIds = coSupervisorIds;
        this.studentId = studentId;
        this.requestDate = requestDate;
        this.approvalDate = approvalDate;
        this.accepted = accepted;
    }
}

export default ThesisRequest