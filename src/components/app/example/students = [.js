students = [
  // ห้อง ม.1/1
  { class: "1/1", number: 1, name: "สมชาย", score: 85 },
  { class: "1/1", number: 2, name: "สมหญิง", score: 90 },
  { class: "1/1", number: 3, name: "สมปอง", score: 78 },
  { class: "1/1", number: 4, name: "สมใจ", score: 88 },
  { class: "1/1", number: 5, name: "สมรัตน์", score: 92 },
  { class: "1/1", number: 6, name: "สมฤดี", score: 80 },
  { class: "1/1", number: 7, name: "สมพร", score: 75 },
  { class: "1/1", number: 8, name: "สมชายาภา", score: 84 },
  { class: "1/1", number: 9, name: "สมฤทธิ์", score: 77 },
  { class: "1/1", number: 10, name: "สมเกียรติ", score: 89 },

  // ห้อง ม.1/2
  { class: "1/2", number: 1, name: "นที", score: 82 },
  { class: "1/2", number: 2, name: "นทีพร", score: 91 },
  { class: "1/2", number: 3, name: "นทีชัย", score: 76 },
  { class: "1/2", number: 4, name: "นทีสุดา", score: 87 },
  { class: "1/2", number: 5, name: "นทีวรรณ", score: 93 },
  { class: "1/2", number: 6, name: "นทีวิภา", score: 79 },
  { class: "1/2", number: 7, name: "นทีโรจน์", score: 81 },
  { class: "1/2", number: 8, name: "นทีวดี", score: 85 },
  { class: "1/2", number: 9, name: "นทีเกียรติ", score: 78 },
  { class: "1/2", number: 10, name: "นทีสิน", score: 88 },

  // ห้อง ม.1/3
  { class: "1/3", number: 1, name: "อรชา", score: 80 },
  { class: "1/3", number: 2, name: "อรพิน", score: 86 },
  { class: "1/3", number: 3, name: "อรพรรณ", score: 74 },
  { class: "1/3", number: 4, name: "อรณี", score: 88 },
  { class: "1/3", number: 5, name: "อรทัย", score: 91 },
  { class: "1/3", number: 6, name: "อรวิภา", score: 82 },
  { class: "1/3", number: 7, name: "อรอนงค์", score: 77 },
  { class: "1/3", number: 8, name: "อรอุษา", score: 85 },
  { class: "1/3", number: 9, name: "อรสิทธิ์", score: 79 },
  { class: "1/3", number: 10, name: "อรเกียรติ", score: 87 }
];

// กรองเฉพาะห้อง 1/2
const class12Students = students.filter(student => student.class === "1/2");

console.log(class12Students);
