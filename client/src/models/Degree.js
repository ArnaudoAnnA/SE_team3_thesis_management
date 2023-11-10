export default function Degree(codDegree, titleDegree) {
    this.codDegree = codDegree;
    this.titleDegree = titleDegree;

    this.parse = function () {
        return {
            codDegree: this.codDegree,
            titleDegree: this.titleDegree
        }
    }
}