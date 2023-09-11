const courseColumns = [
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc',
    },
    {
        title: '讲师',
        dataIndex: 'teacher',
        key: 'teacher',
    },
    {
        title: '课程代码',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: '学分',
        dataIndex: 'credit',
        key: 'credit',
    },
    {
        title: '分类',
        dataIndex: 'categoryID',
        key: 'categoryID',
    },
    {
        title: '上课时间',
        dataIndex: 'schedule',
        key: 'schedule',
    },
    {
        title: '开课时间',
        dataIndex: 'startTime',
        key: 'startTime',

    },
    {
        title: '结课时间',
        dataIndex: 'endTime',
        key: 'endTime',
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
    }

];


const publishCourseColumns = [
    {
        title: '课程名称',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: "课程容量",
        dataIndex: 'capacity',
        key: 'capacity',
    },
    {
        title: '讲师',
        dataIndex: 'teacher',
        key: 'teacher',
    },
    {
        title: '学分',
        dataIndex: 'credit',
        key: 'credit',
    },
    {
        title: '分类',
        dataIndex: 'categoryID',
        key: 'categoryID',
    },
    {
        title: '上课时间',
        dataIndex: 'schedule',
        key: 'schedule',
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
    }

];


const categoryColumns = [
    {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '分类描述',
        dataIndex: 'desc',
        key: 'desc',
    }

]
export {
    courseColumns, publishCourseColumns,categoryColumns
}
