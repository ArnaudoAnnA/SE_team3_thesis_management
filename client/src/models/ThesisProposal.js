export default function ThesisProposal(title, teacherId, type, description, requiredKnowledge, level, programmes, expirationDate, coSupervisors = [], keywords = [], notes = '') {
    this.title = title;
    this.teacherId = teacherId;
    this.type = type;
    this.description = description;
    this.requiredKnowledge = requiredKnowledge;
    this.level = level;
    this.programmes = programmes;
    this.expirationDate = expirationDate;
    this.coSupervisors = coSupervisors;
    this.keywords = keywords;
    this.notes = notes;
}