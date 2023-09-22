export { ClassData, getClasses, getClassesForDropdown };

var ClassData = [
  {
    classID: 1,
    title: "ap calc",
    taskCount: 2,
    content: [
      {
        assignmentName: "test review",
        dueDate: new Date("2023-8-20T00:00:00"),
      },
      {
        assignmentName: "worksheet",
        dueDate: new Date("2023-8-15T00:00:00"),
      },
    ],
  },
  {
    classID: 2,
    title: "suck",
    taskCount: 1,
    content: [
      {
        assignmentName: "eat poop",
        dueDate: new Date("2023-8-10T00:00:00"),
      },
    ],
  },
  {
    classID: 3,
    title: "classy",
    taskCount: 2,
    content: [
      {
        assignmentName: "an assignment",
        dueDate: new Date("2023-8-10T00:00:00"),
      },
      {
        assignmentName: "or two",
        dueDate: new Date("2023-8-10T00:00:00"),
      },
    ],
  },
];

function getClasses(id: number, count: number) {
  var child = [];

  const today: Date = new Date();

  for (let j = 0; j < count; j++) {
    const dd: Date = new Date(ClassData[id - 1].content[j].dueDate);
    const diffTime: number = dd.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    child.push([ClassData[id - 1].content[j].assignmentName, diffDays]);
  }

  for (let i = 0; i < child.length - 1; i++) {
    if (child[i][1] > child[i + 1][1]) {
      const placeholder: Array<any> = child[i];
      child[i] = child[i + 1];
      child[i + 1] = placeholder;
    }
  }

  return child;
}

function getClassesForDropdown() {
  const classNames = [];
  for (let i = 0; i < ClassData.length; i++) {
    classNames.push({
      label: ClassData[i].title,
      value: ClassData[i].classID - 1,
    });
  }
  return classNames;
}
