import dayjs from 'dayjs';

export default function Career(id, codCourse, titleCourse, cfu, grade, date) {
    this.id = id;
    this.codCourse = codCourse;
    this.titleCourse = titleCourse;
    this.cfu = cfu;
    this.grade = grade;
    this.date = dayjs(date);

    this.parse = function () {
        return {
            id: this.id,
            codCourse: this.codCourse,
            titleCourse: this.titleCourse,
            cfu: this.cfu,
            grade: this.grade,
            date: this.date
        }
    }
}