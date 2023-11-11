class Teacher{
    constructor(id, surname, name, email, cod_group, cod_department){
        this.id = id;
        this.surname = surname;
        this.name = name;
        this.email = email;
        this.cod_group = cod_group;
        this.cod_department = cod_department;
        this.role = 'teacher'
    }
    parse(){
        return {
            id: this.id,
            surname: this.surname,
            name: this.name,
            email: this.email,
            cod_group: this.cod_group,
            cod_department: this.cod_department
        }
    }
}

export default Teacher