const now = new Date();

export default [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2022, 3, 0),
    end: new Date(2022, 3, 1),
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(2022, 3, 7),
    end: new Date(2022, 3, 10),
  },

  {
    id: 2,
    title: "DTS STARTS",
    start: new Date(2022, 2, 13, 0, 0, 0),
    end: new Date(2022, 2, 20, 0, 0, 0),
  },

  {
    id: 3,
    title: "DTS ENDS",
    start: new Date(2022, 10, 6, 0, 0, 0),
    end: new Date(2022, 10, 13, 0, 0, 0),
  },

  {
    id: 4,
    title: "Some Event",
    start: new Date(2022, 3, 9, 0, 0, 0),
    end: new Date(2022, 3, 10, 0, 0, 0),
  },
  {
    id: 5,
    title: "Conference",
    start: new Date(2022, 3, 11),
    end: new Date(2022, 3, 13),
    desc: "Big conference for important people",
  },
  {
    id: 6,
    title: "Meeting",
    start: new Date(2022, 3, 12, 10, 30, 0, 0),
    end: new Date(2022, 3, 12, 12, 30, 0, 0),
    desc: "Pre-meeting meeting, to prepare for the meeting",
  },
];
