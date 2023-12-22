
const createApplicationsListGroupByThesis = (applications, studentsInfo) => {
    // console.log("createApplicationsListGroupByThesis")
    // console.log(applications)
    // console.log(studentsInfo)
    // studentsInfo.forEach(student => { console.log(student) })    
    let applicationsListGroupByThesis = []
    applications.forEach(application => {
        // console.log(application) 
        let thesisId = application.thesisId
        let thesisTitle = application.thesisTitle
        let thesisGroupExistsIndex = applicationsListGroupByThesis.findIndex(application => application.thesisId === thesisId);
        // console.log(thesisGroupExistsIndex)
        if (thesisGroupExistsIndex !== -1) {
            let app = {
                id: application.applicationId,
                applicationDate: application.date,
                student: studentsInfo.find(student => student.id == application.studentId),
            }
            applicationsListGroupByThesis[thesisGroupExistsIndex].applications.push(app)
        } else {
            // console.log("else")
            let thesisGroup = {
                thesisId: thesisId,
                thesisTitle: thesisTitle,
                applications: [{
                    id: application.applicationId,
                    applicationDate: application.date,
                    student: studentsInfo.find(student => student.id == application.studentId),
                }]
            }
            // console.log(thesisGroup)
            applicationsListGroupByThesis.push(thesisGroup)
        }
        
    })
    // console.log(applicationsListGroupByThesis)
    return applicationsListGroupByThesis
}

const ApplicationUtils = {
    createApplicationsListGroupByThesis
}

export default ApplicationUtils