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
    [Roles.Student, '学生']
])
const roleOptions = [{value: Roles.Admin, label: '管理员'}, {
    value: Roles.Teacher,
    label: '教师'
}, {value: Roles.Student, label: '学生'}]

const SexMap = new Map<number, string>([
    [Sex.Male, '男'],
    [Sex.Female, '女'],
    [Sex.Secret, '保密']
])

const getSexName = (sex: Sex) => SexMap.get(sex)
const getRoleName = (role: Roles) => roleMap.get(role)


export {
    Roles, Sex, SexMap, getSexName, roleOptions
}

