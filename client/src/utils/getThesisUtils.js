import { where, orderBy } from "firebase/firestore";

/**
 * Build the where conditions for the query
 * @param filters the filters object
 * @returns an array of where conditions
 */
export const buildWhereConditions = async (filters) => {
  let whereConditions = [];

  if (filters === undefined) {
    filters = {};
  }

  let teacher;
  if (filters.supervisor) {
    let teacherName = filters.supervisor;
    let [name, surname] = teacherName.split(" ");
    let teacherQuery = query(
      teachersRef,
      where("name", "==", name),
      where("surname", "==", surname)
    );

    let teacherSnap = await getDocs(teacherQuery);
    teacher = teacherSnap.docs[0].data();

    if (teacher) whereConditions.push(where("teacherId", "==", teacher.id));
  }

  if (filters.coSupervisors && filters.coSupervisors.length > 0) {
    let coSupervisors = filters.coSupervisors;
    whereConditions.push(
      where("coSupervisors", "array-contains-any", coSupervisors)
    );
  }

  if (filters.expirationDate) {
    let expirationDate = filters.expirationDate;

    if (expirationDate.from) {
      let date = dayjs(expirationDate.from);
      whereConditions.push(where("expirationDate", ">=", date.toISOString()));
    }

    if (expirationDate.to) {
      let date = dayjs(expirationDate.to);
      whereConditions.push(where("expirationDate", "<=", date.toISOString()));
    }
  }

  if (filters.level) {
    let level = filters.level;
    whereConditions.push(where("level", "==", level));
  }

  if (filters.keywords && filters.keywords.length > 0) {
    let keywords = filters.keywords;
    whereConditions.push(where("keywords", "array-contains-any", keywords));
  }

  if (filters.type) {
    let type = filters.type;
    whereConditions.push(where("type", "==", type));
  }

  if (filters.title) {
    console.log("Filter on title not implemented yet");
  }

  if (filters.groups && filters.groups.length > 0) {
    console.log("Filter on groups not implemented yet");
  }

  if (filters.programmes) {
    console.log("Filter on programmes not implemented yet");
  }

  return whereConditions;
};

export const composeOrderByQuery = (orderByArray, whereConditionsFields) => {
  console.log(whereConditionsFields)

  let orderByConditions = [];

  if (orderByArray) {
    orderByArray.forEach((ob) => {
      orderByConditions.push(orderBy(ob.field, ob.direction));
    });
  }

  return orderByConditions;
}
