enum Sex {
    Male = 0,
    Female = 1,
    Secret = 2
}

enum Roles {
    Admin = 1,
    Teacher = 2,
    Student = 3

}

const roleMap = new Map<number, string>([
    [Roles.Admin, '管理员'],
    [Roles.Teacher, '教师'],
    [Roles.Student, '学生']]
)
const getRoleName = (role: Roles) => roleMap.get(role);


const SexMap = new Map<number, string>([
    [0, '男'],
    [1, '女'],
    [2, '保密']
])
const getSexName = (sex: Sex) => SexMap.get(sex)


export {
    Roles, roleMap, getRoleName, Sex, SexMap, getSexName
}
