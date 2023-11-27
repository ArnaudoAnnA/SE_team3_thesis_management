
const createApplicationsListGroupByThesis = (applications, studentsInfo) => {
    console.log("createApplicationsListGroupByThesis")
    console.log(applications)
    console.log(studentsInfo)
    studentsInfo.forEach(student => { console.log(student) })    
    let applicationsListGroupByThesis = []
    applications.forEach(application => {
        let thesisId = application.thesisId
        let thesisTitle = application.thesisTitle
        let thesisApplications = applicationsListGroupByThesis.find(applications => applications.thesisId === thesisId)
        if (thesisApplications) {
            thesisApplications.applications.push(application)
        } else {
            console.log(studentsInfo.filter(student => student.id == application.studentId))
            console.log(application.studentId)
            console.log(studentsInfo[0])
            applicationsListGroupByThesis.push({
                thesisId: thesisId,
                thesisTitle: thesisTitle,
                applications: [{
                    id: application.applicationId,
                    applicationDate: application.date,
                    student: studentsInfo.find(student => student.id == application.studentId),
                }]
            })
        }
    })
    console.log(applicationsListGroupByThesis)
    return applicationsListGroupByThesis
}

const ApplicationUtils = {
    createApplicationsListGroupByThesis
}

export default ApplicationUtils