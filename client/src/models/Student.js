class Student{
    constructor(id, surname, name, gender, nationality, email, cod_degree, enrollment_year){
    this.id = id;
    this.surname = surname;
    this.name = name;
    this.gender = gender;
    this.nationality = nationality;
    this.email = email;
    this.cod_degree = cod_degree;
    this.enrollment_year = enrollment_year;
    this.role = 'student'
    }
    parse() {
        return {
            id: this.id,
            surname: this.surname,
            name: this.name,
            gender: this.gender,
            nationality: this.nationality,
            email: this.email,
            cod_degree: this.cod_degree,
            enrollment_year: this.enrollment_year
        }
    }
}
export default Student